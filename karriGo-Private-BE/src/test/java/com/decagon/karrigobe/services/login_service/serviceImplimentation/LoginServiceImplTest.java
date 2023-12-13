package com.decagon.karrigobe.services.login_service.serviceImplimentation;

import com.decagon.karrigobe.entities.enums.Gender;
import com.decagon.karrigobe.entities.model.UserEntity;
import com.decagon.karrigobe.payload.request.LoginRequest;
import com.decagon.karrigobe.payload.response.AuthResponse;
import com.decagon.karrigobe.repositories.UserRepository;
import com.decagon.karrigobe.security.JWTGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LoginServiceImplTest {
    @InjectMocks
    private LoginServiceImpl loginService;

    @Mock
    private UserRepository userRepo;
    @Mock
    private Authentication authentication;
    @Mock
    private JWTGenerator jwtGenerator;
    @Mock
    private PasswordEncoder encoder;
    @Mock
    private AuthenticationManager authenticationManager;

    private LoginRequest loginRequest;
    private UserEntity user1;

    @BeforeEach
    void setUp() {
        user1 = UserEntity.builder()
                .firstName("Mike")
                .lastName("John")
                .email("mike@gmail.com")
                .password("1234")
                .confirmPassword("1234")
                .phoneNumber("08011111111")
                .address("Somewhere")
                .gender(Gender.MALE)
                .build();

        userRepo.save(user1);

        loginRequest = LoginRequest.builder()
                .email("mike@gmail.com")
                .password("1234")
                .build();

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

//    @Test
//    void login() {
//        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
//        when(encoder.matches(Mockito.anyString(), Mockito.anyString())).thenReturn(true);
//        when(userRepo.findUserEntityByEmail(Mockito.anyString())).thenReturn(Optional.ofNullable(user1));
//        when(jwtGenerator.generateToken(Mockito.any(), Mockito.anyLong())).thenReturn(Mockito.anyString());
//
//        AuthResponse authResponse = loginService.login(loginRequest,request);
//
//        assertNotNull(authResponse);
//    }

    @Test
    void logout() {
        assertAll(SecurityContextHolder::clearContext);
    }
}