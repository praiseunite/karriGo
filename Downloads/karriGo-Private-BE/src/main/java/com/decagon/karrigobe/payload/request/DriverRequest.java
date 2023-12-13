package com.decagon.karrigobe.payload.request;

import com.decagon.karrigobe.entities.enums.DriverStatus;
import jakarta.validation.constraints.*;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DriverRequest {

    @Size(min = 3, max = 25, message = "First name is too long or short")
    @NotBlank(message = "First name cannot be blank")
    private String firstName;

    @Size(max = 25, message = "Last name is too long")
    private String lastName;

    @Size(max = 35)
    @Email
    @NotBlank(message = "Email should not be blank!")
    private String email;

    @Size(min = 11, max = 11, message = "Phone number too long or short.")
    @NotBlank
    private String phoneNumber;

    @Size(min = 3, max = 100, message = "Address is too long or short")
    @NotBlank(message = "Address cannot be empty!")
    private  String address;

    @NotNull(message = "Gender cannot be empty")
    private String gender;

    @NotBlank(message = "Date of birth can not be empty")
    private String dob;
}
