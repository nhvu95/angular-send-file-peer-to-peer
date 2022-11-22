package com.f2f.backend.ds;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="SignalingChannel")
@Getter
@Setter
public class SignalingChannel {
	
	public SignalingChannel() {
		super();
	}
	
    public SignalingChannel(Long sourceOwnerId, String accessKey) {
    	this.sourceOwnerId = sourceOwnerId;
    	this.accessKey = accessKey;	
    }

	@Id
	@Column(name = "channel_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long channelId;
	String accessKey;
	Long sourceOwnerId;
	
    @OneToMany(mappedBy="peerId")
	Set<Peer> actors;
}
