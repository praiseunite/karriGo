package com.decagon.karrigobe.exceptions;

public class TransactionErrorException extends RuntimeException {
    public TransactionErrorException(String message) {
        super(message);
    }
}
