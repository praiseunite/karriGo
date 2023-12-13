package com.decagon.karrigobe.services.verification_services;

public interface VerificationServices {
    String verifyUserEmail(String token);
    void re_sendVerificationEmail(String email);
}
