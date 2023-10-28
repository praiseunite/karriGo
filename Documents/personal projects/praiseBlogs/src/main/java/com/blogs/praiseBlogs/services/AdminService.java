package com.blogs.praiseBlogs.services;

import com.blogs.praiseBlogs.dto.AdminSignUpDTO;
import com.blogs.praiseBlogs.dto.LoginDTO;
import com.blogs.praiseBlogs.dto.UserDTO;
import com.blogs.praiseBlogs.exceptions.EmailMissMatchException;
import com.blogs.praiseBlogs.exceptions.ExistingEmailException;
import com.blogs.praiseBlogs.exceptions.PasswordMissMatchException;
import com.blogs.praiseBlogs.exceptions.WrongLoginException;
import com.blogs.praiseBlogs.model.Admin;
import com.blogs.praiseBlogs.model.User;
import com.blogs.praiseBlogs.repository.AdminUserRepo;
import com.blogs.praiseBlogs.services.interfaces.AdminInterface;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AdminService implements AdminInterface {

    @Autowired
    private AdminUserRepo adminUserRepo;
    private final ModelMapper mapper = new ModelMapper();

    @Override
    public UserDTO registerUser(AdminSignUpDTO adminSignUpDTO) {
        if (adminUserRepo.existsByEmail(adminSignUpDTO.getEmail())){
            throw new ExistingEmailException("Email exist, input another email or Login");
        }

        if(!adminSignUpDTO.getEmail().equals(adminSignUpDTO.getConfirmEmail())){
            throw new EmailMissMatchException("Email does not match");
        }

        if(!adminSignUpDTO.getPassword().equals(adminSignUpDTO.getConfirmPassword())){
            throw new PasswordMissMatchException("Password Does not match");
        }

        Admin newAdmin = mapper.map(adminSignUpDTO, Admin.class);
        newAdmin.setRole("Admin");

        newAdmin.setFirst_name(adminSignUpDTO.getFirst_names());
        newAdmin.setLast_name(adminSignUpDTO.getLast_names());
        newAdmin.setAge(adminSignUpDTO.getAge());
        newAdmin.setSex(adminSignUpDTO.getSex());
        newAdmin.setPhone_number(adminSignUpDTO.getPhone_number());
        newAdmin.setEmail(adminSignUpDTO.getEmail());

        Admin saveAdmin = adminUserRepo.save(newAdmin);

        return mapper.map(saveAdmin, UserDTO.class);
    }


    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
        Admin admin = adminUserRepo.findAdminByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword())
                .orElseThrow(()-> new WrongLoginException(" Email or Password Incorrect"));
        return mapper.map(admin, UserDTO.class);
        }

    @Override
    public void deleteUser(Long adminId) {
        adminUserRepo.deleteById(adminId);
    }
}
