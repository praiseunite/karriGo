package com.decagon.karrigobe.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    @Size(min = 3, max = 25, message = "First name is too long or short")
    @NotBlank(message = "First name cannot be blank")
    private String firstName;

    @Size(max = 25, message = "Last name is too long")
    private String lastName;

    @Size(max = 35)
    @Email(message = "Must be a valid email")
    @NotBlank(message = "Email should not be blank!")
    private String email;

    @Size(min = 4, max = 15, message = "Password too short or long")
    @NotBlank(message = "Password cannot be blank!")
    private String password;

    @Size(min = 4, max = 15, message = "Confirm Password too short or long")
    @NotBlank(message = "Confirm Password cannot be blank!")
    private String confirmPassword;

    @Size(min = 11, max = 11, message = "Phone number too long or short")
    @NotBlank(message = "Phone number is blank!")
    @Digits(fraction = 0, integer = 11, message = "Phone number is incorrect!")
    private String phoneNumber;

    @Size(min = 3, max = 100, message = "Address is too long or short")
    @NotBlank(message = "Address cannot be empty!")
    private  String address;

    @NotBlank(message = "Gender cannot be empty!")
    @Pattern(regexp = "(MALE|male|FEMALE|female)", message = "Must be \"MALE|male|FEMALE|female\"")
    private String gender;

    @NotBlank(message = "Date of birth can not be empty")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private String dob;
}