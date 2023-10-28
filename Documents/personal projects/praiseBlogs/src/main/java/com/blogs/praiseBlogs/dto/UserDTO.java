package com.blogs.praiseBlogs.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long userId;
    private String first_name;
    private String last_name;
    private String username;
    private String email;
    private String role;
    private String sex;
    private String phone_number;
}
