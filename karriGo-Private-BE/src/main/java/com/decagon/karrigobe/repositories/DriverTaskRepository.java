package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.enums.TaskStatus;
import com.decagon.karrigobe.entities.model.DriverTaskEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverTaskRepository extends JpaRepository<DriverTaskEntity, Long> {
    Slice<DriverTaskEntity> findByDriverEntityId(Long driverId, Pageable pageable);
    Slice<DriverTaskEntity> findByDriverEntityEmailAndTaskStatusIsNotNullOrderByIdDesc(String email, Pageable pageable);
    Slice<DriverTaskEntity> findAllByDriverEntityEmailAndTaskStatusIsNull(String email, Pageable pageable);
    Slice<DriverTaskEntity> findAllByTaskStatusOrderById(TaskStatus taskStatus, Pageable pageable);
}
