package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.model.OrderDescriptionEntity;
import com.decagon.karrigobe.entities.model.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderDescriptionRepository extends JpaRepository<OrderDescriptionEntity, Long> {
    Optional<OrderDescriptionEntity> findByOrderEntityId(Long id);
    Optional<OrderDescriptionEntity> findByOrderEntityTrackingNum(String trackingNum);
}
