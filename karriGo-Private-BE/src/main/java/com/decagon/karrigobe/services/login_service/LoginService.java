package com.decagon.karrigobe.services.login_service;

import com.decagon.karrigobe.payload.request.LoginRequest;
import com.decagon.karrigobe.payload.response.AuthResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface LoginService {
    AuthResponse login(LoginRequest loginRequest, HttpServletRequest request);
    void logout();
}
