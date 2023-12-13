package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.model.KYDEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KYDRepository extends JpaRepository<KYDEntity, Long> {
}
