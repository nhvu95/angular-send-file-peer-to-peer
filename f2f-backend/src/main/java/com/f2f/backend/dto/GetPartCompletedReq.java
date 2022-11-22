package com.f2f.backend.dto;

import lombok.Data;

@Data
public class GetPartCompletedReq {
	Long fileId;
	Integer index;
	Integer totalPart;
}
