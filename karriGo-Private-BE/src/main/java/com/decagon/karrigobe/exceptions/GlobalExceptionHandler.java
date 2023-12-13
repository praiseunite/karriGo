package com.decagon.karrigobe.exceptions;

import com.decagon.karrigobe.entities.model.ErrorDetail;
import com.decagon.karrigobe.payload.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

import static com.decagon.karrigobe.utils.DateUtils.toDateString;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleUnauthorizedException(final UnauthorizedException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.UNAUTHORIZED)
                .debugMessage("You are not authorized to login from here")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ChangeDefaultPasswordException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleChangeDefaultPasswordException(final ChangeDefaultPasswordException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .debugMessage("Update the default password for the driver")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PasswordMismatchException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handlePasswordMismatchException(final PasswordMismatchException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .debugMessage("Check passwords and try again")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleDuplicateEmailException(final DuplicateEmailException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .debugMessage("Email already registered. Login or register with a new email.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailNotSentException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleEmailNotSentException(final EmailNotSentException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .debugMessage("Email sending failed. Try again.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleInvalidPasswordException(final InvalidPasswordException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.NOT_ACCEPTABLE)
                .debugMessage("Check password and try again.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleUserNotFoundException(final UserNotFoundException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.NOT_FOUND)
                .debugMessage("Check email and try again.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TokenExpirationException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleTokenExpirationException(final TokenExpirationException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.NOT_FOUND)
                .debugMessage("Please ask for a new link.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NewAndOldPasswordException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleNewAndOldPasswordException(final NewAndOldPasswordException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.NOT_FOUND)
                .debugMessage("Change new password and try again.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleOrderNotFoundException(final OrderNotFoundException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.NOT_FOUND)
                .debugMessage("Check order id and try again.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OrderCannotBeCanceledException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleOrderCannotBeCanceledException(final OrderCannotBeCanceledException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .debugMessage("Oder can not be canceled. 5 minutes have gone by since order was made.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleTaskNotFoundException(final TaskNotFoundException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.NOT_FOUND)
                .debugMessage("Check task id and try again.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotVerifiedException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleUserNotVerifiedException(final UserNotVerifiedException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .debugMessage("Verify email and try again.")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TransactionErrorException.class)
    public ResponseEntity<ApiResponse<ErrorDetail>> handleTransactionNotFoundException(final TransactionErrorException exception){
        ErrorDetail errorDetail = ErrorDetail.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .debugMessage("Transaction failed!")
                .dateTime(toDateString(LocalDateTime.now()))
                .build();
        ApiResponse<ErrorDetail> response = new ApiResponse<>(exception.getMessage(), errorDetail);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    public ResponseEntity<ApiResponse<String>> handleMethodArgumentNotValidExceptionException(MethodArgumentNotValidException exception) {
        String errorMessage = "Request validation failure. Please check your request data.";
        BindingResult result = exception.getBindingResult();
        FieldError fieldError = result.getFieldError();
        if(fieldError != null) {
            errorMessage = fieldError.getDefaultMessage();
        }
        log.info("error message: {}", errorMessage);
        ApiResponse<String> apiResponse = new ApiResponse<>(errorMessage);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }


}
