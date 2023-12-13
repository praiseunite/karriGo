package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.model.TrackingLocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrackingLocationRepository extends JpaRepository<TrackingLocationEntity, Long> {
    TrackingLocationEntity findByOrderEntityTrackingNum(String trackingNum);
}