package com.decagon.karrigobe.services.signup_login_service;

import com.decagon.karrigobe.payload.request.DriverRequest;
import com.decagon.karrigobe.payload.request.UserRequest;
import jakarta.servlet.http.HttpServletRequest;

public interface SignupAndLoginServices {
    String register(UserRequest userRequest, HttpServletRequest request);
    String driverRegister(DriverRequest driverRequest, HttpServletRequest request);
}
