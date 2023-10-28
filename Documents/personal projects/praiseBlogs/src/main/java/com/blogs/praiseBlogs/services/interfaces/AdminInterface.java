package com.blogs.praiseBlogs.services.interfaces;

import com.blogs.praiseBlogs.dto.AdminSignUpDTO;
import com.blogs.praiseBlogs.dto.LoginDTO;
import com.blogs.praiseBlogs.dto.UserDTO;

public interface AdminInterface {
    UserDTO registerUser (AdminSignUpDTO adminSignUpDTO);
    UserDTO loginUser (LoginDTO loginDTO);
    void deleteUser(Long id);
}
