package com.decagon.karrigobe.payload.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    private String email;
    private String picture;
    private String address;
    private String Password;
    private String confirmPassword;
}
