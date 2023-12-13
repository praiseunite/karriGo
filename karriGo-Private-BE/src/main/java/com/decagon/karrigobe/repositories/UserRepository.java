package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.enums.DriverStatus;
import com.decagon.karrigobe.entities.enums.Roles;
import com.decagon.karrigobe.entities.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findUserEntityByEmail(String email);
    Boolean existsByEmail(String email);
    List<UserEntity> findByRolesAndDriverStatus(Roles role, DriverStatus status);
    List<UserEntity> findByRoles(Roles role);
    Slice<UserEntity> findAllByRoles(Roles roles, Pageable pageable);
//    Page<UserEntity> findAllByRoles(Roles roles);
    List<UserEntity> findAllByRoles(Roles role);
    long countDistinctByRoles(Roles roles);

}