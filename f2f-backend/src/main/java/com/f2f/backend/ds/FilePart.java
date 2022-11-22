package com.f2f.backend.ds;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;

@Entity
@IdClass(FilePartId.class)
@Table(name = "FilePart")
@Data
public class FilePart {
	public FilePart() {
	}

	public FilePart(Long ownerId, Long channelId, Integer totalPart, Integer index, Long origin) {
		super();
		this.ownerId = ownerId;
		this.channelId = channelId;
		this.totalPart = totalPart;
		this.index = index;
		this.state = state.AVAILABLE;
		this.origin = origin;
	}

	@Id
	@Column(name = "file_id")
	@GenericGenerator(name = "file_id", strategy = "com.f2f.backend.utilities.FileIdGenerator")
	@GeneratedValue(generator = "file_id")
	Long fileId;

	@Id
	Long ownerId;

	@Id
	Integer index = 0;

	Long channelId;

	Long origin = 0L; // OL mean origin file part, Not OL mean copy file part

	EPayloadState state;
	Integer totalPart;

	public String getSID() {
		return this.fileId + "-" + this.index;
	}
}
