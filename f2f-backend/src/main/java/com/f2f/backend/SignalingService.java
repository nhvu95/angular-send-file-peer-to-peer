package com.f2f.backend;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.f2f.backend.ds.EPeerState;
import com.f2f.backend.ds.FilePart;
import com.f2f.backend.ds.Peer;
import com.f2f.backend.ds.SignalingChannel;
import com.f2f.backend.dto.GetPartCompletedReq;
import com.f2f.backend.dto.InitializeChannelReq;
import com.f2f.backend.dto.InitializeChannelRes;
import com.f2f.backend.repo.FilePartRepository;
import com.f2f.backend.repo.PeerRepository;
import com.f2f.backend.repo.SignalingChannelRepository;
import com.f2f.backend.utilities.Base58;

@Service
public class SignalingService {

	SignalingChannelRepository signalingRepo;
	PeerRepository peerRepo;
	FilePartRepository fileRepo;

	@Autowired
	SignalingService(SignalingChannelRepository signalingRepo, PeerRepository peerRepo, FilePartRepository fileRepo) {
		this.signalingRepo = signalingRepo;
		this.peerRepo = peerRepo;
		this.fileRepo = fileRepo;
	}

	public boolean validatePeer(Long peerId) {
		return peerRepo.existsById(peerId);
	}

	public String encryptChannelId(Long channelId) {
		String newId = String.format("%09d", channelId);
		return Base58.encode(newId.getBytes());
	}

	public Long decryptChannelId(String encryptedChannelId) {
		String channelIdStr = new String(Base58.decode(encryptedChannelId));
		Long channelId = Long.parseLong(channelIdStr.replaceFirst("^0+(?!$)", ""));
		return channelId;
	}

	public boolean validateChannel(Long channelId, String accessKey) {
		// Check channel exist
		Optional<SignalingChannel> optChannel = signalingRepo.findById(channelId);
		if (optChannel.isEmpty()) {
			return false;
		}
		// Check access key is valid
		SignalingChannel channel = optChannel.get();
		if (!BCrypt.checkpw(accessKey, channel.getAccessKey())) {
			return false;
		}

		return true;
	}

	/**
	 * STEP 1. Get Peer Id Each browser have 1 Peer Id
	 * 
	 * @return
	 */
	public Long getPeerId() {
		Peer newPeer = this.peerRepo.save(new Peer());
		return newPeer.getPeerId();
	}

	/**
	 * STEP 2. One of Peers(Browser) create a channel and let other Peers join in.
	 * The channel Id will be convert from @NUMBER to a hash @String to prevent
	 * hacker crawl
	 * 
	 * @param req
	 * @return
	 */
	public InitializeChannelRes initializeChannel(InitializeChannelReq req) {
		String accessKey = UUID.randomUUID().toString().split("-")[0];
		String accessKeyEncrpt = BCrypt.hashpw(accessKey, BCrypt.gensalt(12));
		SignalingChannel newChannel = this.signalingRepo.save(new SignalingChannel(req.peerId, accessKeyEncrpt));
		return new InitializeChannelRes(encryptChannelId(newChannel.getChannelId()), accessKey);
	}

	/**
	 * STEP 2.5. Get Channel information
	 * 
	 * @param req
	 * @return
	 */
	public SignalingChannel getChannelInformation(Long channelId) {
		Optional<SignalingChannel> newChannel = this.signalingRepo.findById(channelId);
		return newChannel.orElse(null);
	}

	/**
	 * STEP 3. One of Peers(Browser) register a shared file This file and all it
	 * parts will be store as a record to the database
	 * 
	 * @param req
	 * @return the file part index 0
	 */
	public FilePart registerFile(Long channelId, Long peerId, Integer totalPart) {
		FilePart file = fileRepo.save(new FilePart(peerId, channelId, totalPart, 0, 0L));
		List<FilePart> parts = new ArrayList<FilePart>();
		for (int i = 1; i < totalPart; i++) {
			FilePart part = new FilePart(peerId, channelId, totalPart, i, 0L);
			parts.add(part);
		}
		if (parts.size() > 0) {
			fileRepo.saveAll(parts);
		}
		return file;
	}

	/**
	 * STEP 4. Receiver(Browser) ask to download a file System will return the
	 * suitable part and suitable sender which receiver should ask for. TODO: TODO:
	 * 
	 * Hey! Last year browser cannot download files greater than 2Gb by using
	 * FileSaver.js So I split a file into many small parts and manage them.
	 * Nowaday, we have Streamsaver.js and WriteableStream. We can save file streams
	 * directly. So all files send now have only one part with partIndex =0;
	 * 
	 * @param channelId
	 * @param peerId
	 * @param fileId
	 * @return
	 */
	public FilePart getPartForPeer(Long channelId, Long peerId, Long fileId) {

		List<FilePart> allParts;
		Map<String, Integer> ownedParts;

		allParts = fileRepo.getAllFilePartByChannel(channelId);
		ownedParts = allParts.stream().filter(part -> part.getOwnerId().equals(peerId))
				.collect(Collectors.toMap(FilePart::getSID, c -> c.getIndex()));

		// MINI_STEP 2: Get free peers
		SignalingChannel channel = signalingRepo.findById(channelId).get();
		// MINI_STEP 3: Do we have any part is missing ? find it
		Set<String> missingParts = new HashSet<String>();

		if (ownedParts.size() > 0) {
			allParts.forEach(filePart -> {
				if (filePart.getOwnerId().equals(peerId))
					return;

				Long _fileId = filePart.getFileId();
				int index = filePart.getIndex();

				if (ownedParts.containsKey(_fileId + "-" + index)) {
					return;
				}

				missingParts.add(_fileId + "-" + index);
			});

		} else {
			allParts.forEach(part -> {
				Long key = part.getFileId();
				Integer index = part.getIndex();
				missingParts.add(key + "-" + index);
			});
		}

		// MINI_STEP 4: If there is no free peer. ask the source (Channel holder)
		FilePart missing = allParts.stream().filter(part -> {
			// Get all parts that belong to a sourceOwner - He always has what we need
			if (!part.getOwnerId().equals(channel.getSourceOwnerId())) {
				return false;
			}
			return true;
		}).filter(part -> {
			// Get first part that this peer is missing
			Long key = part.getFileId();
			Integer index = part.getIndex();
			return missingParts.contains(key + "-" + index);
		}).findFirst().orElse(null);

		return missing;
	}

	/**
	 * Get All File in this channel
	 * 
	 * @param channelId
	 * @return
	 */
	public List<FilePart> getAllPartOrigin(Long channelId) {
		List<FilePart> allParts = fileRepo.getAllFilePartOrigin(channelId);
		return allParts.stream().filter(file -> file.getIndex().equals(0)).collect(Collectors.toList());
	}

	/**
	 * STEP 5. Receiver(Browser) send request to mark that it own this part And
	 * others receiver can take from him
	 * 
	 * @param channelId
	 * @param peerId
	 * @param req
	 * @return
	 */
	public FilePart getPartCompleted(Long channelId, Long peerId, GetPartCompletedReq req) {
		FilePart newPart = new FilePart(peerId, channelId, req.getTotalPart(), req.getIndex(), req.getFileId());
		return this.fileRepo.save(newPart);
	}

	/**
	 * STEP 6. Set Peer Status
	 * 
	 * @return
	 */
	public Peer setPeerStatus(Long peerId, Long fileId, EPeerState state) {
		Optional<Peer> optPeer = this.peerRepo.findById(peerId);
		Peer peer = optPeer.orElse(null);
		switch (state) {
		case IDLE:
			peer.setReceiving(null);
			peer.setSending(null);
			break;
		case SENDING:
			peer.setSending(fileId);
			break;
		case TAKING:
			peer.setReceiving(fileId);
			break;
		default:
			break;
		}
		return this.peerRepo.save(peer);
	}
}
