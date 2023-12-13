package com.decagon.karrigobe.payload.response;

import com.decagon.karrigobe.utils.DateUtils;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Data
public class ApiResponse<T> {
    private String responseMessage;
    private T responseData;
    private final String responseTime = DateUtils.toDateString(LocalDateTime.now());

    public ApiResponse(String message) {
        this.responseMessage = message;
        this.responseData = null;

    }
    public ApiResponse(String message, T data) {
        this.responseMessage = message;
        this.responseData = data;
    }
}
