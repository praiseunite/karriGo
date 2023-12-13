package com.decagon.karrigobe.services.notification_service;

import com.decagon.karrigobe.entities.model.NotificationMessageEntity;
import com.decagon.karrigobe.payload.response.NotificationResponse;
import org.springframework.data.domain.Page;

public interface NotificationService {
    void sendNotification(String message, Long userId);
    Page<NotificationResponse> findAllNotificationsSentToAUserUsingPagingAndSorting(String email, int offset, int pageSize, String field);
    NotificationResponse mapToResponse(NotificationMessageEntity entity);

}
