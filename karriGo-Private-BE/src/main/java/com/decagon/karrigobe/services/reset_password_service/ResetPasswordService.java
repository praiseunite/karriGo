package com.decagon.karrigobe.services.reset_password_service;

import com.decagon.karrigobe.payload.request.ResetPasswordRequest;

public interface ResetPasswordService {
    String resetPasswordLink(String email);
    String validateResetPasswordEmail(String token);
    String updatePassword(ResetPasswordRequest resetPasswordRequest, String email);
}
