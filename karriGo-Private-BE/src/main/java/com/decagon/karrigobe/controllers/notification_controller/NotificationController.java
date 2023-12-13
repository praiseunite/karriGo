package com.decagon.karrigobe.controllers.notification_controller;

import com.decagon.karrigobe.payload.response.NotificationResponse;
import com.decagon.karrigobe.services.notification_service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/{offset}/{pageSize}/{field}")
    public Page<NotificationResponse> getAllNotificationsByAUser(@PathVariable("offset") int offset,
                                                                 @PathVariable("pageSize") int pageSize,
                                                                 @PathVariable("field") String field){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return notificationService.findAllNotificationsSentToAUserUsingPagingAndSorting(email,offset,pageSize,field);
    }
}