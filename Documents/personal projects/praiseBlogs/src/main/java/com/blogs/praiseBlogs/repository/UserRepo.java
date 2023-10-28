package com.blogs.praiseBlogs.repository;

import com.blogs.praiseBlogs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<User> findUserByUsernameAndPassword(String username, String password);
}
