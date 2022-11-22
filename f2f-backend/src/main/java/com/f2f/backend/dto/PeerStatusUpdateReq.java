package com.f2f.backend.dto;

import java.util.Optional;

import com.f2f.backend.ds.EPeerState;

import lombok.Data;
@Data
public class PeerStatusUpdateReq {
	EPeerState state;
	Optional<Long> fileId;
}
