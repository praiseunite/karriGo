package com.decagon.karrigobe.services.verification_services.serviceImplementation;

import com.decagon.karrigobe.entities.enums.Gender;
import com.decagon.karrigobe.entities.model.UserEntity;
import com.decagon.karrigobe.repositories.UserRepository;
import com.decagon.karrigobe.security.JWTGenerator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VerificationServiceImplTest {

    @InjectMocks
    private VerificationServiceImpl verificationService;

    @Mock
    private UserRepository userRepo;
    @Mock
    private JWTGenerator jwtGenerator;

    @Mock
    private Authentication authentication;

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

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

//    @Test
//    void verifyUserEmail() {
//        UserEntity savedUser = Mockito.mock(UserEntity.class);
//        String token = "1234567eqwefghjhgfdscvbhgfd";
//
//        String email = "mike@gmail.com";
//        when(jwtGenerator.validateToken(Mockito.anyString())).thenReturn(true);
//        when(jwtGenerator.getEmailFromJWT(Mockito.anyString())).thenReturn(email);
//        when(userRepo.findUserEntityByEmail(Mockito.anyString())).thenReturn(Optional.ofNullable(user1));
//        when(userRepo.save(Mockito.any(UserEntity.class))).thenReturn(savedUser);
//
//        String expected = "Email verified successfully. Now you can login to your account";
//
//        String actual = verificationService.verifyUserEmail(token);
//
//        Assertions.assertEquals(expected, actual);
//    }

    @Test
    void re_sendVerificationEmail() {
        String email = "karrigo@gmail.com";
        assertAll(()-> verificationService.re_sendVerificationEmail(email));
    }
}