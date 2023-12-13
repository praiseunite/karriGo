package com.decagon.karrigobe.services.admin_service.serviceImplementation;

import com.decagon.karrigobe.entities.enums.Roles;
import com.decagon.karrigobe.entities.enums.TaskStatus;
import com.decagon.karrigobe.entities.model.DriverTaskEntity;
import com.decagon.karrigobe.entities.model.UserEntity;
import com.decagon.karrigobe.exceptions.UserNotFoundException;
import com.decagon.karrigobe.payload.response.*;
import com.decagon.karrigobe.repositories.DriverTaskRepository;
import com.decagon.karrigobe.repositories.UserRepository;
import com.decagon.karrigobe.services.admin_service.AdminService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.decagon.karrigobe.entities.enums.RecordStatusConstant.ACTIVE;
import static com.decagon.karrigobe.entities.enums.RecordStatusConstant.INACTIVE;
import static com.decagon.karrigobe.entities.enums.Roles.DRIVER;
import static com.decagon.karrigobe.entities.enums.Roles.USER;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final ModelMapper mapper = new ModelMapper();
    private final UserRepository userRepository;
    private final DriverTaskRepository driverTaskRepository;


    @Override
    public UserPageDTO getAllUsers(int pageNo, int pageSize, String sortBy, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Slice<UserEntity> userPage = userRepository.findAllByRoles(USER, pageable);

        if (userPage == null) {
            return UserPageDTO.builder()
                    .pageNo(0)
                    .pageSize(0)
                    .lastPage(true)
                    .userResponseList(new ArrayList<>())
                    .build();
        }

        List<UserEntity> userEntities = userPage.getContent();
        List<UserResponse> userResponses = new ArrayList<>();
        for (UserEntity user : userEntities) {
            userResponses.add(mapper.map(user, UserResponse.class));
        }
        return UserPageDTO.builder()
                .pageNo(userPage.getNumber())
                .pageSize(userPage.getSize())
                .lastPage(userPage.isLast())
                .userResponseList(userResponses)
                .build();
    }


    @Override
    public PaginatedResponse<UserResponse> pageView(String role, int pageNo, int pageSize, String sortBy) {
        try {
            Sort sort = Sort.by("firstName");
            Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

            Slice<UserEntity> users = userRepository.findAllByRoles(Roles.valueOf(role.toUpperCase()), pageable);

            PaginatedResponse<UserResponse> response = new PaginatedResponse<>();
            response.setContent(users.isEmpty() ? new ArrayList<>() :
                    users.map(user -> UserResponse.builder()
                            .id(user.getId())
                            .gender(String.valueOf(user.getGender()))
                            .phoneNumber(user.getPhoneNumber())
                            .pictureUrl(user.getPictureUrl())
                            .email(user.getEmail())
                            .firstName(user.getFirstName())
                            .lastName(user.getLastName())
                            .address(user.getAddress())
                            .availableStatus(String.valueOf(user.getDriverStatus()))
                            .activeStatus(String.valueOf(user.getRecordStatus()))
                            .build()).toList());
            response.setPageNo(users.getNumber());
            response.setPageSize(users.getSize());
            response.setTotalElement(users.getNumberOfElements());
            response.setLast(users.isLast());

            return response;
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException("Driver not found");
        }
    }

    @Override
    public PaginatedResponse<DriverTaskResponse> pageTasks(Long driverId, int pageNo, int pageSize, String SortBy) {
        Sort sort = Sort.by("dateCreated");

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Slice<DriverTaskEntity> tasks = driverTaskRepository.findByDriverEntityId(driverId, pageable);
        PaginatedResponse<DriverTaskResponse> response = new PaginatedResponse<>();
        response.setContent(tasks.isEmpty() ? new ArrayList<>() :
                tasks.map(task -> DriverTaskResponse.builder()
                                .id(task.getId())
                                .taskStatus(task.getTaskStatus())
                                .orderResponse(task.getOrderEntity().stream()
                                        .map(order -> OrderResponse.builder()
                                                .orderId(order.getId())
                                                .status(order.getStatus())
                                                .build())
                                        .toList())
                                .build())
                        .toList());
        response.setPageNo(tasks.getNumber());
        response.setPageSize(tasks.getSize());
        response.setTotalElement(tasks.getNumberOfElements());
        response.setLast(tasks.isLast());

        return response;
    }

    @Override
    public String disableADriversAccount(Long driverID) {
        UserEntity driver = userRepository.findById(driverID)
                .orElseThrow(() -> new UserNotFoundException("user does not exist"));

        if (driver.getRecordStatus().equals(ACTIVE)) {
            driver.setRecordStatus(INACTIVE);
            userRepository.save(driver);
            return "Driver's account has been disabled";

        }

        driver.setRecordStatus(ACTIVE);
        userRepository.save(driver);
        return "Driver's account has been enabled";
    }

    @Override
    public UserAndDriverCount countUserAndDriver(){
        long userCount = userRepository.countDistinctByRoles(USER);
        long driverCount = userRepository.countDistinctByRoles(DRIVER);

        return UserAndDriverCount.builder()
                .driverCount(driverCount)
                .userCount(userCount)
                .build();
    }

    @Override
    public OrderHistory getOrderHistory(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Slice<DriverTaskEntity> taskEntities = driverTaskRepository.findAllByTaskStatusOrderById(TaskStatus.ACCEPTED, pageable);

        return OrderHistory.builder()
                .pageSize(taskEntities.getSize())
                .pageNo(taskEntities.getNumber())
                .lastPage(taskEntities.isLast())
                .aboutOrderList(taskEntities.stream().map((task) -> {
                            if (task.getOrderEntity().isEmpty() || task.getOrderEntity().get(0).getOrderDescriptionEntity() == null) {
                                return null;
                            }
                            return AboutOrder.builder()
                                    .orderId(task.getOrderEntity().get(0).getId())
                                    .orderStatus(String.valueOf(task.getOrderEntity().get(0).getStatus()))
                                    .itemCategory(String.valueOf(task.getOrderEntity().get(0).getOrderDescriptionEntity().getItemCategory()))
                                    .email(task.getOrderEntity().get(0).getUserEntity().getEmail())
                                    .address(task.getOrderEntity().get(0).getUserEntity().getAddress())
                                    .deliveryPrice(task.getOrderEntity().get(0).getDeliveryCost())
                                    .firstName(task.getOrderEntity().get(0).getUserEntity().getFirstName())
                                    .lastName(task.getOrderEntity().get(0).getUserEntity().getLastName())
                                    .phoneNum(task.getOrderEntity().get(0).getUserEntity().getPhoneNumber())
                                    .imageURL(task.getOrderEntity().get(0).getUserEntity().getPictureUrl())
                                    .itemName(task.getOrderEntity().get(0).getOrderDescriptionEntity().getItemName())
                                    .dropOffLocation(task.getOrderEntity().get(0).getOrderDescriptionEntity().getDropOffLocation())
                                    .pickUpLocation(task.getOrderEntity().get(0).getOrderDescriptionEntity().getPickUpLocation())
                                    .senderName(task.getOrderEntity().get(0).getOrderDescriptionEntity().getSenderName())
                                    .receiverName(task.getOrderEntity().get(0).getOrderDescriptionEntity().getReceiverName())
                                    .receiverPhone(task.getOrderEntity().get(0).getOrderDescriptionEntity().getReceiverPhone())
                                    .trackingNum(task.getOrderEntity().get(0).getTrackingNum())
                                    .locationList(task.getOrderEntity().get(0).getTrackingLocationEntities().stream()
                                            .map((location) -> TrackingLocationResponse.builder()
                                                    .locationId(location.getId())
                                                    .dateTime(String.valueOf(location.getDateCreated()))
                                                    .location(location.getLocation())
                                                    .build())
                                            .toList())
                                    .build();
                        })

                        .toList())
                .build();
    }

    @Transactional
    @Override
    public String deleteDriver(Long driverId) {
        userRepository.deleteById(driverId);
        return "Driver deleted";
    }

}
