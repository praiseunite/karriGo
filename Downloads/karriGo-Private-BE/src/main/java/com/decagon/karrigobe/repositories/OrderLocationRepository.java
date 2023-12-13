package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.model.OrderEntity;
import com.decagon.karrigobe.entities.model.OrderLocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderLocationRepository extends JpaRepository<OrderLocationEntity, Long> {

}
