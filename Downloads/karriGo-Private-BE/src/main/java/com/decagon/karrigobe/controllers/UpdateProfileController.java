package com.decagon.karrigobe.controllers;


import com.decagon.karrigobe.payload.request.ChangeAddressRequest;
import com.decagon.karrigobe.payload.request.ChangePasswordRequest;
import com.decagon.karrigobe.payload.response.ApiResponse;
import com.decagon.karrigobe.payload.response.UserResponse;
import com.decagon.karrigobe.services.update_user_profile.UpdateUserServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/profile")
public class UpdateProfileController {

    private final UpdateUserServices updateUserServices;

    @PostMapping("/update_password")
    public ResponseEntity<ApiResponse<String>> updatePassword(@Valid @RequestBody ChangePasswordRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(updateUserServices.updatePassword(request)));
    }

    @PostMapping("/update_address")
    public ResponseEntity<ApiResponse<String>> updateAddress(@Valid @RequestBody ChangeAddressRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(updateUserServices.updateAddress(request)));
    }

    @PostMapping("/picture")
    public ResponseEntity<ApiResponse<String>> uploadPicture(@RequestParam("image") MultipartFile file) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(updateUserServices.uploadPicture(file)));
    }

    @GetMapping("/user_details")
    public ResponseEntity<ApiResponse<UserResponse>> getUserDetails(){
        return ResponseEntity.ok().body(new ApiResponse<>("Success", updateUserServices.getUser()));
    }

}
