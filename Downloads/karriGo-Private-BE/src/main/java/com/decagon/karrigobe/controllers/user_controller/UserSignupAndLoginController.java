package com.decagon.karrigobe.controllers.user_controller;

import com.decagon.karrigobe.payload.request.LoginRequest;
import com.decagon.karrigobe.payload.request.UserRequest;
import com.decagon.karrigobe.payload.response.ApiResponse;
import com.decagon.karrigobe.payload.response.AuthResponse;
import com.decagon.karrigobe.services.login_service.LoginService;
import com.decagon.karrigobe.services.signup_login_service.SignupAndLoginServices;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class  UserSignupAndLoginController {
    private final SignupAndLoginServices signupAndLoginServices;
    private final LoginService loginService;

    @Operation(
            description = "Get end point for SignUp",
            summary = "user will be able to SignUp",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            description = "Success",
                            responseCode = "201"
                    ),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            description = "Unauthorized / Invalid Token",
                            responseCode = "403"
                    )
            }
    )
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<String>> registration(@Valid @RequestBody UserRequest userRequest, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(signupAndLoginServices.register(userRequest, request)));
    }

    @Operation(
            description = "Get end point for LogIn",
            summary = "user will be able to LogIn",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            description = "Success",
                            responseCode = "200"
                    ),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            description = "Unauthorized / Invalid Token",
                            responseCode = "403"
                    )
            }
    )
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request){
        return ResponseEntity.ok(new ApiResponse<>("Login successfully", loginService.login(loginRequest,request)));
    }

    @Operation(
            description = "Get end point for LogOut",
            summary = "user will be able to LogOut",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            description = "Success",
                            responseCode = "200"
                    ),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            description = "Unauthorized / Invalid Token",
                            responseCode = "403"
                    )
            }
    )
    @GetMapping("/logout")
    private ResponseEntity<ApiResponse<String>> logout(){
        loginService.logout();
        return ResponseEntity.ok(new ApiResponse<>("Logout Successfully"));
    }
}
