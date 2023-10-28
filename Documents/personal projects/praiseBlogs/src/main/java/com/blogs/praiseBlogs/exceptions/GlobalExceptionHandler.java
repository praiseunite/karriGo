package com.blogs.praiseBlogs.exceptions;

import com.blogs.praiseBlogs.model.errormessage.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailMissMatchException.class)
    public ResponseEntity<ErrorResponse> handlePasswordMissMatchException(final EmailMissMatchException exception){
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .dateTime(LocalDateTime.now())
                .debugMessage("Check email and try again.")
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ExistingEmailException.class)
    public ResponseEntity<ErrorResponse> handleExistingEmailException(final ExistingEmailException exception){
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .dateTime(LocalDateTime.now())
                .debugMessage("Enter new Email or login.")
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ExistingUsernameException.class)
    public ResponseEntity<ErrorResponse> handleExistingEmailException(final ExistingUsernameException exception){
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .dateTime(LocalDateTime.now())
                .debugMessage("Enter new Email or login.")
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PasswordMissMatchException.class)
    public ResponseEntity<ErrorResponse> handlePasswordMissMatchException(final PasswordMissMatchException exception){
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .dateTime(LocalDateTime.now())
                .debugMessage("Check password and try again.")
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongLoginException.class)
    public ResponseEntity<ErrorResponse> handleWrongLoginException(final WrongLoginException exception){
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .dateTime(LocalDateTime.now())
                .debugMessage("Check password or email and try again.")
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
