package com.decagon.karrigobe.controllers.verificationController;

import com.decagon.karrigobe.payload.response.ApiResponse;
import com.decagon.karrigobe.services.verification_services.VerificationServices;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/registration")
public class VerificationController {
    private final VerificationServices verificationServices;

    @Operation(
            description = "Get end point for email_verification",
            summary = "Both admin,user and drivers will be able to verify Email",
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
    public ResponseEntity<ApiResponse<String>> verifyEmail(@RequestParam("token") String token){
        return ResponseEntity.ok( new ApiResponse<>("Email verified successfully. Now you can login to your account", verificationServices.verifyUserEmail(token)));
    }

    @Operation(
            description = "Get end point for email confirmation",
            summary = "Both admin,user and drivers will be able to confirm email",
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
    @GetMapping("/re_verification")
    public ResponseEntity<ApiResponse<String>> emailReverification(@RequestParam("email") String email){
        verificationServices.re_sendVerificationEmail(email);
        return ResponseEntity.ok(new ApiResponse<>("Email verification sent.\nCheck your email and click on the link to verify."));
    }
}
