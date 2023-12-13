package com.decagon.karrigobe.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TrackingLocationRequest {
    @Size(min = 3, max = 255, message = "Location too short or long")
    @NotBlank(message = "Location cannot be empty")
    private String location;
}