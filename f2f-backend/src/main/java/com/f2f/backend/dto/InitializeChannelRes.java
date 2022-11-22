package com.f2f.backend.dto;

import lombok.Data;

@Data
public class InitializeChannelRes {
	
	public InitializeChannelRes(String channelId, String accessKey) {
		this.channelId = channelId;
		this.accessKey = accessKey;
	}
		
	String channelId;
	String accessKey;

}
