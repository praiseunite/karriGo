package com.decagon.karrigobe.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class ChangePasswordRequest {
    @NotBlank(message = "Password cannot be blank")
    private String oldPassword;

    @Size(min = 4, max = 15, message = "Password too short or long")
    @NotBlank(message = "Password cannot be blank")
    private String newPassword;

    @Size(min = 4, max = 15, message = "Password too short or long")
    @NotBlank(message = "Password cannot be blank")
    private String confirmNewPassword;

}
