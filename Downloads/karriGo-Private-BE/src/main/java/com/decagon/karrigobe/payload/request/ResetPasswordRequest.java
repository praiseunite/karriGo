package com.decagon.karrigobe.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequest {
    @Size(min = 4, max = 15, message = "Password too short or long")
    @NotBlank(message = "Password cannot be blank!")
    private String newPassword;

    @Size(min = 4, max = 15, message = "Password too short or long")
    @NotBlank(message = "Password cannot be blank!")
    private String confirmPassword;
}
