package com.f2f.backend.ds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Peer")
@Getter
@Setter
public class Peer {

	@Id
	@Column(name = "peer_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long peerId;
	Long sending;
	Long receiving;

	@ManyToOne
	@JoinColumn(name = "channelId", nullable = true)
	private SignalingChannel channel;
	
	
}
