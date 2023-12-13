package com.decagon.karrigobe.exceptions;

public class NewAndOldPasswordException extends RuntimeException {
    public NewAndOldPasswordException(String message) {
        super(message);
    }
}
