package com.decagon.karrigobe.controllers.reset_password_controller;

import com.decagon.karrigobe.payload.request.ResetPasswordRequest;
import com.decagon.karrigobe.payload.response.ApiResponse;
import com.decagon.karrigobe.services.reset_password_service.ResetPasswordService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reset_password")
public class ResetPasswordController {

    private final ResetPasswordService resetPasswordService;

    @Operation(
            description = "Get end point for reset_password",
            summary = "Both admin, drivers and users will be able to reset_password",
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
    @GetMapping("")
    public ResponseEntity<ApiResponse<String>> resetPasswordLink(@RequestParam("email") String email){
        return ResponseEntity.ok(new ApiResponse<>(resetPasswordService.resetPasswordLink(email)));
    }

    @Operation(
            description = "Get end point for email_verification",
            summary = "Both admin, drivers and users will be able to verify email",
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
    @GetMapping("/email_verification")
    public ResponseEntity<ApiResponse<String>> emailValidation(@RequestParam("token") String token){
        return ResponseEntity.ok(new ApiResponse<>("Email verified", resetPasswordService.validateResetPasswordEmail(token)));
    }

    @Operation(
            description = "Get end point for password_update",
            summary = "Both admin, drivers and users will be able to update password",
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
    @PostMapping("/password_update")
    public ResponseEntity<ApiResponse<String>> passwordUpdate(@RequestParam("email") String email, @RequestBody ResetPasswordRequest resetPasswordRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(resetPasswordService.updatePassword(resetPasswordRequest, email)));
    }

}
