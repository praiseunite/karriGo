package com.decagon.karrigobe.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @Email(message = "Must be a valid email")
    @NotBlank(message = "Email should not be blank!")
    private String email;

    @NotBlank(message = "Password cannot be blank!")
    private String password;
}
