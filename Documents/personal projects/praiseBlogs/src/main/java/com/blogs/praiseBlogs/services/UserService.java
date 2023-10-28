package com.blogs.praiseBlogs.services;

import com.blogs.praiseBlogs.dto.LoginDTO;
import com.blogs.praiseBlogs.dto.SignUpDTO;
import com.blogs.praiseBlogs.dto.UserDTO;
import com.blogs.praiseBlogs.exceptions.*;
import com.blogs.praiseBlogs.model.User;
import com.blogs.praiseBlogs.repository.UserRepo;
import com.blogs.praiseBlogs.services.interfaces.UserInterface;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService implements UserInterface {

    @Autowired
    private UserRepo userRepo;
    private final ModelMapper mapper = new ModelMapper();

    @Override
    public UserDTO registerUser(SignUpDTO signUpDTO) {
        if (userRepo.existsByEmail(signUpDTO.getEmail())) {
            throw new ExistingEmailException("Email exist, input another email or Login");
        }

        if(!signUpDTO.getEmail().equals(signUpDTO.getConfirmEmail())){
            throw new EmailMissMatchException("Email does not match");
        }

        if (userRepo.existsByUsername(signUpDTO.getUsername())){
            throw new ExistingUsernameException("Username Already Exist");
        }

        if(!signUpDTO.getPassword().equals(signUpDTO.getConfirmPassword())){
            throw new PasswordMissMatchException("Password Does not match");
        }

        User newUser = mapper.map(signUpDTO, User.class);
        newUser.setRole("User");
        newUser.setAge(signUpDTO.getAge());
        newUser.setFirst_name(signUpDTO.getFirst_names());
        newUser.setEmail(signUpDTO.getEmail());
        newUser.setSex(signUpDTO.getSex());
        newUser.setLast_name(signUpDTO.getLast_names());
        newUser.setPhone_number(signUpDTO.getPhone_number());


        User saveUser = userRepo.save(newUser);

        return mapper.map(saveUser, UserDTO.class);
    }


    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
        User user = userRepo.findUserByUsernameAndPassword(loginDTO.getUsername(), loginDTO.getPassword())
                .orElseThrow(() -> new WrongLoginException("Username or Password Incorrect"));
        return mapper.map(user, UserDTO.class);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepo.deleteById(userId);
    }
}
