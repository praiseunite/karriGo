package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.enums.OrderStatus;
import com.decagon.karrigobe.entities.enums.RecordStatusConstant;
import com.decagon.karrigobe.entities.model.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
//    List<OrderEntity> findAllByStatusAndDriverTaskEntityIsNNull(OrderStatus status);
    List<OrderEntity> findAllByStatusAndDriverTaskEntityIsNull(OrderStatus status);
    Page<OrderEntity> findOrderEntitiesByRecordStatusOrderByDateCreatedDesc(RecordStatusConstant recordStatus, Pageable pageable);
    Page<OrderEntity> findAllByUserEntity_EmailOrderByDateCreated(String userEntity_email, Pageable pageable);
    Page<OrderEntity> findAllByUserEntityEmailOrderByIdDesc(String email, Pageable pageable);

    Optional<OrderEntity> findByTrackingNum(String trackingNum);
    Optional<OrderEntity> findOrderEntityById(Long id);
    Optional<OrderEntity> findFirstByUserEntityEmailOrderByDateCreatedDesc(String email);
    Slice<OrderEntity> findAllByStatusOrStatusOrStatusOrderByIdAsc(OrderStatus status, OrderStatus status2, OrderStatus status3, Pageable pageable);
}
