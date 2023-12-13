package com.decagon.karrigobe.repositories;

import com.decagon.karrigobe.entities.model.NotificationMessageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationMessageRepository extends JpaRepository<NotificationMessageEntity, Long> {
    Page<NotificationMessageEntity> findAllByUsersEmail(String userEmail, PageRequest pageRequest);

}