package com.f2f.backend.ds;

public enum EPeerState {
	IDLE(0),
	TAKING(1),
	SENDING(2);
	
    private final int value;
    
    EPeerState(final int newValue) {
        value = newValue;
    }

    public int getValue() { return value; }
}
