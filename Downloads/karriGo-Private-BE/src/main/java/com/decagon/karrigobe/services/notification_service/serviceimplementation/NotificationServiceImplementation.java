package com.decagon.karrigobe.services.notification_service.serviceimplementation;

import com.decagon.karrigobe.entities.model.NotificationMessageEntity;
import com.decagon.karrigobe.entities.model.UserEntity;
import com.decagon.karrigobe.exceptions.UserNotFoundException;
import com.decagon.karrigobe.payload.response.NotificationResponse;
import com.decagon.karrigobe.repositories.NotificationMessageRepository;
import com.decagon.karrigobe.repositories.UserRepository;
import com.decagon.karrigobe.services.notification_service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImplementation implements NotificationService {
    private final NotificationMessageRepository notificationMessageRepo;
    private final UserRepository userRepo;
    private final ModelMapper modelMapper = new ModelMapper();


    @Override
    public void sendNotification(String message, Long userId) {
        UserEntity user = userRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("user was not found"));
        NotificationMessageEntity notificationMessage = new NotificationMessageEntity();
        notificationMessage.setMessage(message);
        user.addToNotification(notificationMessage);
        userRepo.save(user);
    }

    @Override
    public NotificationResponse mapToResponse(NotificationMessageEntity entity) {
        return modelMapper.map(entity, NotificationResponse.class);
    }
    @Override
    public Page<NotificationResponse> findAllNotificationsSentToAUserUsingPagingAndSorting(String email, int offset, int pageSize, String field) {
        Page<NotificationMessageEntity> response =  notificationMessageRepo
                .findAllByUsersEmail(email, PageRequest.of(offset,pageSize).withSort(Sort.by(Sort.Direction.DESC,field)));
        return response.map(this::mapToResponse);
    }
}
