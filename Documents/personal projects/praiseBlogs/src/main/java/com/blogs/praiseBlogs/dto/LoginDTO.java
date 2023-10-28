package com.blogs.praiseBlogs.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginDTO {

    @NotBlank(message = "*required")
    @Size(min = 10, max = 35)
    private String email;

    @NotBlank(message = "*required")
    @Size(min = 4, max = 25)
    private String username;

    @NotBlank(message = "*required")
    @Size(min = 4, max = 15)
    private String password;
}
