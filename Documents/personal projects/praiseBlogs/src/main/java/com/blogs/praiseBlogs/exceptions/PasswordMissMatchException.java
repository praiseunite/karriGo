package com.blogs.praiseBlogs.exceptions;

public class PasswordMissMatchException extends RuntimeException {
    public PasswordMissMatchException(String message) {
        super(message);
    }
}
