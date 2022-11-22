package com.f2f.backend.ds;

import java.io.Serializable;

import lombok.Data;

@Data
public class FilePartId implements Serializable {
	
	public FilePartId() {
		super();
	}

	public FilePartId(Long fileId, Long ownerId, Integer index) {
		super();
		this.fileId = fileId;
		this.ownerId = ownerId;
		this.index = index;
	}

	@SuppressWarnings("unused")
	private Long fileId;

	@SuppressWarnings("unused")
	private Long ownerId;

	@SuppressWarnings("unused")
	private Integer index;
}