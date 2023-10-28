package com.blogs.praiseBlogs.model.errormessage;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorResponse {
    private String message;
    private HttpStatus status;
    private LocalDateTime dateTime;
    private String debugMessage;
}
