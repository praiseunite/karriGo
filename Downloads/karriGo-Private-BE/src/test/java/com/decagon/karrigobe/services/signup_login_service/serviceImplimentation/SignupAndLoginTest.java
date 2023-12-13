package com.decagon.karrigobe.services.signup_login_service.serviceImplimentation;

import com.decagon.karrigobe.entities.enums.Gender;
import com.decagon.karrigobe.entities.enums.Roles;
import com.decagon.karrigobe.entities.model.UserEntity;
import com.decagon.karrigobe.payload.request.UserRequest;
import com.decagon.karrigobe.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SignupAndLoginTest {

    @InjectMocks
    private SignupAndLogin signupAndLogin;

    @Mock
    private UserRepository userRepo;
    @Mock
    private ApplicationEventPublisher publisher;
    @Mock
    private Authentication authentication;
    @Mock
    private PasswordEncoder encoder;

    private UserRequest user1;

    @BeforeEach
    void setUp() {
        user1 = UserRequest.builder()
                .firstName("Mike")
                .lastName("John")
                .email("mike@gmail.com")
                .password("1234")
                .confirmPassword("1234")
                .phoneNumber("08011111111")
                .address("Somewhere")
                .gender("MALE")
                .build();

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

//    @Test
//    void register() {
//        String path = "/api/v1/users";
//        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
//        UserEntity saveUser = UserEntity.builder()
//                .firstName("Mike")
//                .lastName("John")
//                .email("mike@gmail.com")
//                .password("1234")
//                .confirmPassword("1234")
//                .phoneNumber("08011111111")
//                .address("Somewhere")
//                .gender(Gender.MALE)
//                .roles(Roles.USER)
//                .build();
//
////        path = request.getServletPath();
//        when(path.contains(Mockito.anyString())).thenReturn(true);
//        when(userRepo.existsByEmail(Mockito.anyString())).thenReturn(false);
//        when(userRepo.save(Mockito.any(UserEntity.class))).thenReturn(saveUser);
////        when(encoder.encode(Mockito.anyString())).thenReturn(Mockito.anyString());
//        String expected = "Verification link sent to Email. Check email and verify your account.";
//
//        String actual = signupAndLogin.register(user1, request);
//
//        Assertions.assertEquals(expected, actual);
//    }
}