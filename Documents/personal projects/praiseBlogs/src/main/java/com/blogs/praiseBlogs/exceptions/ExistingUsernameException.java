package com.blogs.praiseBlogs.exceptions;

public class ExistingUsernameException extends RuntimeException {
    public ExistingUsernameException(String message) {
        super(message);
    }
}
