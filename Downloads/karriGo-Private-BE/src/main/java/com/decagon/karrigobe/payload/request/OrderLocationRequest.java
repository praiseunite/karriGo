package com.decagon.karrigobe.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderLocationRequest {
    @Size(min = 3, max = 255, message = "Location too short or long")
    @NotBlank(message = "Pickup location can not be empty")
    private String pickUpLocation;

    @Size(min = 3, max = 255, message = "Location too short or long")
    @NotBlank(message = "Drop-Off location can not be empty")
    private String dropOffLocation;
}