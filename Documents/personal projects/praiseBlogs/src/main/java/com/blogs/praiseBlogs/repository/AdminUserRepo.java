package com.blogs.praiseBlogs.repository;

import com.blogs.praiseBlogs.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminUserRepo extends JpaRepository<Admin, Long> {
    boolean existsByEmail(String email);
    Optional<Admin> findAdminByEmailAndPassword(String email, String password);
}
