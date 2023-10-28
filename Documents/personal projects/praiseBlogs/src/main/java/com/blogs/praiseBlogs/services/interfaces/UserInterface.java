package com.blogs.praiseBlogs.services.interfaces;

import com.blogs.praiseBlogs.dto.AdminSignUpDTO;
import com.blogs.praiseBlogs.dto.LoginDTO;
import com.blogs.praiseBlogs.dto.SignUpDTO;
import com.blogs.praiseBlogs.dto.UserDTO;

public interface UserInterface {
    UserDTO registerUser (SignUpDTO signUpDTO);
    UserDTO loginUser (LoginDTO loginDTO);
    void deleteUser(Long id);
}
