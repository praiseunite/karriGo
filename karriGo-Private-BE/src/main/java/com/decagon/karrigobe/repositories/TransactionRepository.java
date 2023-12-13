package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.model.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
}