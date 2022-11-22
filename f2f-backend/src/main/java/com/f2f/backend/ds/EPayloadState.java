package com.f2f.backend.ds;

public enum EPayloadState {
	NOT_AVAILABLE(0),
	TAKING(1),
	AVAILABLE(2);
	
    private final int value;
    
    EPayloadState(final int newValue) {
        value = newValue;
    }

    public int getValue() { return value; }
}
