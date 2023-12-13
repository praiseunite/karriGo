package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.enums.Gender;
import com.decagon.karrigobe.entities.model.UserEntity;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class UserRepositoryTest {

    private UserEntity user1;
    private UserEntity user2;

    @Autowired
    private UserRepository userRepo;

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

        user2 = UserEntity.builder()
                .firstName("Mary")
                .lastName("Ann")
                .email("mary@gmail.com")
                .password("1234")
                .confirmPassword("1234")
                .phoneNumber("08011111112")
                .address("Some place")
                .gender(Gender.FEMALE)
                .build();

        userRepo.save(user1);
        userRepo.save(user2);
    }

    @Test
    void findUserEntityByEmail() {
        Optional<UserEntity> result = userRepo.findUserEntityByEmail(user1.getEmail());

        Assertions.assertTrue(result.isPresent());
    }

    @Test
    void existsByEmail() {
        boolean exist = userRepo.existsByEmail(user2.getEmail());

        Assertions.assertTrue(exist);
    }
}