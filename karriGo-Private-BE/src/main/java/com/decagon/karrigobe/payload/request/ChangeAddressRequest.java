package com.decagon.karrigobe.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class ChangeAddressRequest {
    @Size(min = 3, max = 100, message = "Address is too long or short")
    @NotBlank(message = "Address cannot be empty!")
    private String address;
}
