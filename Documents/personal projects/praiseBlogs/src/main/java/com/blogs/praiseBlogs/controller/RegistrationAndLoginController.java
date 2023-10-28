package com.blogs.praiseBlogs.controller;

import com.blogs.praiseBlogs.dto.AdminSignUpDTO;
import com.blogs.praiseBlogs.dto.LoginDTO;
import com.blogs.praiseBlogs.dto.SignUpDTO;
import com.blogs.praiseBlogs.dto.UserDTO;
import com.blogs.praiseBlogs.services.interfaces.AdminInterface;
import com.blogs.praiseBlogs.services.interfaces.UserInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class RegistrationAndLoginController {

    private final UserInterface userInterface;
    private final AdminInterface adminInterface;

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> registerUsers(@RequestBody  SignUpDTO signUpDTO){
        System.out.println("Registration complete");
        return ResponseEntity.ok(userInterface.registerUser(signUpDTO));
    }

    @PostMapping("/admin/signup")
    public ResponseEntity<UserDTO> registerAdminUsers(@RequestBody AdminSignUpDTO adminSignUpDTO){
        System.out.println("Registration complete");
        return ResponseEntity.ok(adminInterface.registerUser(adminSignUpDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody LoginDTO loginDTO){
        System.out.println("Login Successfully");
        return ResponseEntity.ok(userInterface.loginUser(loginDTO));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<UserDTO> loginAdmin(@RequestBody LoginDTO loginDTO){
        System.out.println("Login Successfully");
        return ResponseEntity.ok(adminInterface.loginUser(loginDTO));
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<String> removeUser(@PathVariable Long userId){
        userInterface.deleteUser(userId);
        System.out.println("Deletion complete");
        return ResponseEntity.ok("User with ID: "+userId+" deleted.");
    }

    @DeleteMapping("/user/{adminId}")
    public ResponseEntity<String> removeAdmin(@PathVariable Long adminId){
        adminInterface.deleteUser(adminId);
        System.out.println("Deletion complete");
        return ResponseEntity.ok("User with ID: "+adminId+" deleted.");
    }
}
