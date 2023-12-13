package com.decagon.karrigobe.exceptions;

public class TokenExpirationException extends RuntimeException {
    public TokenExpirationException(String message) {
        super(message);
    }
}
