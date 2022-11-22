package com.f2f.backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.f2f.backend.ds.FilePart;
import com.f2f.backend.ds.FilePartId;

@Repository
public interface FilePartRepository  extends JpaRepository<FilePart, FilePartId> {
	@Query(value = "SELECT * FROM file_part u WHERE u.channel_id = :channelId", nativeQuery = true)
	List<FilePart> getAllFilePartByChannel(@Param("channelId") Long channelId);
	
	@Query(value = "SELECT * FROM file_part u WHERE u.channel_id = :channelId AND u.origin == 0", nativeQuery = true)
	List<FilePart> getAllFilePartOrigin(@Param("channelId") Long channelId);
	
	@Query(value = "SELECT * FROM file_part u WHERE u.channel_id = :channelId AND u.owner_id != :peerId", nativeQuery = true)
	List<FilePart> getAllFilePartByChannelExcept(@Param("channelId") Long channelId, @Param("peerId") Long peerId);
	
	@Query(value = "SELECT * FROM file_part u WHERE u.channel_id = :channelId AND u.owner_id == :peerId", nativeQuery = true)
	List<FilePart> getAllFilePartByChannelOf(@Param("channelId") Long channelId, @Param("peerId") Long peerId);
	
	@Query(value = "SELECT * FROM file_part u WHERE u.file_id = :fileId AND u.owner_id != :peerId", nativeQuery = true)
	List<FilePart> getAllFilePartByFileIdExcept(@Param("fileId") Long fileId,  @Param("peerId") Long peerId);
	
	@Query(value = "SELECT * FROM file_part u WHERE u.file_id = :fileId", nativeQuery = true)
	List<FilePart> getAllFilePartByFileId(@Param("fileId") Long fileId);
}
