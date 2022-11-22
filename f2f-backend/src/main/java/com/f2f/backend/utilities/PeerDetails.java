package com.f2f.backend.utilities;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class PeerDetails {
	Long peerId;
	Long channelId;

}
