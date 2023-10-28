package com.blogs.praiseBlogs.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpDTO {
    @NotBlank(message = "*required")
    @Size(min = 2, max = 25)
    private String first_names;

    @NotBlank(message = "*required")
    @Size(min = 2, max = 25)
    private String last_names;

    @NotBlank(message = "*required")
    @Size(min = 4, max = 25)
    private String username;

    @NotBlank(message = "*required")
    @Size(min = 2, max = 2)
    private int age;

    @NotBlank(message = "*required")
    @Size(min = 2, max = 6)
    private String sex;

    @NotBlank(message = "*required")
    @Size(min = 10, max = 16)
    private String phone_number;

    @NotBlank(message = "*required")
    @Size(min = 12, max = 35)
//    @Email
    private String email;

    @NotBlank(message = "*required")
    @Size(min = 12, max = 35)
    private String confirmEmail;

    @NotBlank(message = "*required")
    @Size(min = 4, max = 15)
    private String password;

    @NotBlank(message = "*required")
    @Size(min = 4, max = 15)
    private String confirmPassword;
    private String address;
    private String role = "user";
}
