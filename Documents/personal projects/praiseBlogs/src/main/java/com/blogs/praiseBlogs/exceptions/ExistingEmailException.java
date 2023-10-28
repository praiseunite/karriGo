package com.blogs.praiseBlogs.exceptions;

public class ExistingEmailException extends RuntimeException{
    public ExistingEmailException(String message) {
        super(message);
    }
}
