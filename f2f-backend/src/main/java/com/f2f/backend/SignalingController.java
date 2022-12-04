package com.f2f.backend;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.f2f.backend.ds.FilePart;
import com.f2f.backend.ds.Peer;
import com.f2f.backend.ds.SignalingChannel;
import com.f2f.backend.dto.GetPartCompletedReq;
import com.f2f.backend.dto.InitializeChannelReq;
import com.f2f.backend.dto.InitializeChannelRes;
import com.f2f.backend.dto.PeerStatusUpdateReq;
import com.f2f.backend.dto.RegisterFileReq;
import com.f2f.backend.utilities.AuthorizationValid;
import com.f2f.backend.utilities.PeerDetails;

@RestController
@RequestMapping("v1")
public class SignalingController {

	SignalingService signalingServ;
	PeerDetails peerDetails;

	@Autowired
	SignalingController(SignalingService signalingServ, PeerDetails peerDetails) {
		this.signalingServ = signalingServ;
		this.peerDetails = peerDetails;
	}

	@GetMapping("/peer")
	public Long getPeerId() {
		return this.signalingServ.getPeerId();
	}

	@PutMapping("/peer/{peerId}")
	public Peer setPeerStatus(@PathVariable("peerId") Long peerId, @RequestBody PeerStatusUpdateReq req) {
		return this.signalingServ.setPeerStatus(peerId, req.getFileId().orElse(null), req.getState());
	}

	@PostMapping("/channel/initialize")
	public ResponseEntity<?> intitalizeChannel(@RequestBody InitializeChannelReq req) {
		Long peerId = req.getPeerId();
		if (peerId == null || !this.signalingServ.validatePeer(peerId)) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

		InitializeChannelRes res = this.signalingServ.initializeChannel(req);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("/channel/{channelId}/owner")
	@AuthorizationValid
	public ResponseEntity<?> getChannelInfor(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
			@PathVariable("channelId") String encryptedChannelId) {
		Long channelId = this.peerDetails.getChannelId();
		SignalingChannel channel = this.signalingServ.getChannelInformation(channelId);
		if (channel == null) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(channel.getSourceOwnerId(), HttpStatus.OK);
	}

	@PostMapping("/channel/{channelId}/file")
	@AuthorizationValid
	public ResponseEntity<?> registerFile(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
			@PathVariable("channelId") String encryptedChannelId, @RequestBody RegisterFileReq req) {
		Long peerId = this.peerDetails.getPeerId();
		Long channelId = this.peerDetails.getChannelId();
		FilePart entityFile = this.signalingServ.registerFile(channelId, peerId, req.totalPart);
		return new ResponseEntity<>(entityFile, HttpStatus.OK);
	}

	@GetMapping("/channel/{channelId}/file")
	@AuthorizationValid
	public ResponseEntity<?> getNextPart(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
			@PathVariable("channelId") String encryptedChannelId, @RequestParam("fileId") Optional<Long> fileId) {
		Long peerId = this.peerDetails.getPeerId();
		Long channelId = this.peerDetails.getChannelId();
		FilePart nextPart = this.signalingServ.getPartForPeer(channelId, peerId, fileId.orElse(null));
		if ( nextPart != null ) {
			return new ResponseEntity<>(nextPart, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(nextPart, HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/channel/{channelId}/file")
	@AuthorizationValid
	public ResponseEntity<?> getPartComplete(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
			@PathVariable("channelId") String encryptedChannelId, @RequestBody GetPartCompletedReq req) {
		Long peerId = this.peerDetails.getPeerId();
		Long channelId = this.peerDetails.getChannelId();
		FilePart entityFile = this.signalingServ.getPartCompleted(channelId, peerId, req);
		return new ResponseEntity<>(entityFile, HttpStatus.OK);
	}
}
