package com.decagon.karrigobe.services.driver_service.serviceImplementation;

import com.decagon.karrigobe.entities.enums.OrderStatus;
import com.decagon.karrigobe.entities.model.DriverTaskEntity;
import com.decagon.karrigobe.entities.model.OrderEntity;
import com.decagon.karrigobe.entities.model.TrackingLocationEntity;
import com.decagon.karrigobe.entities.model.UserEntity;
import com.decagon.karrigobe.exceptions.OrderNotFoundException;
import com.decagon.karrigobe.exceptions.TaskNotFoundException;
import com.decagon.karrigobe.exceptions.UserNotFoundException;
import com.decagon.karrigobe.kafka.KafkaProducer;
import com.decagon.karrigobe.payload.response.*;
import com.decagon.karrigobe.repositories.DriverTaskRepository;
import com.decagon.karrigobe.repositories.OrderDescriptionRepository;
import com.decagon.karrigobe.repositories.OrderRepository;
import com.decagon.karrigobe.repositories.UserRepository;
import com.decagon.karrigobe.services.driver_service.DriverService;
import com.decagon.karrigobe.services.driver_service.DriverTaskChoice;
import com.decagon.karrigobe.services.notification_service.serviceimplementation.NotificationServiceImplementation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

import static com.decagon.karrigobe.entities.enums.DriverStatus.AVAILABLE;
import static com.decagon.karrigobe.entities.enums.DriverStatus.UNAVAILABLE;
import static com.decagon.karrigobe.entities.enums.OrderStatus.ORDER_CONFIRMED;
import static com.decagon.karrigobe.entities.enums.Roles.ADMIN;
import static com.decagon.karrigobe.entities.enums.Roles.DRIVER;
import static com.decagon.karrigobe.entities.enums.TaskStatus.REJECTED;

@Service
@Slf4j
@RequiredArgsConstructor
public class DriverServiceImplementation implements DriverService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final DriverTaskRepository driverTaskRepo;
    private final KafkaProducer kafkaProducer;
    private final DriverTaskChoice driverTaskChoice;
    private final OrderDescriptionRepository descriptionRepo;
    private final NotificationServiceImplementation notificationService;

    @Transactional
    @Override
    public void generateRandomOrder() {
        List<OrderEntity> allConfirmedOrders = orderRepository.findAllByStatusAndDriverTaskEntityIsNull(ORDER_CONFIRMED);
        List<UserEntity> drivers = userRepository.findByRolesAndDriverStatus(DRIVER, AVAILABLE);
        Random random = new Random();
        OrderEntity customerOrder = (allConfirmedOrders.size() == 1) ? allConfirmedOrders.get(0) :
                allConfirmedOrders.get(random.nextInt(0, allConfirmedOrders.size() - 1));

        if (!drivers.isEmpty()) {
            assignTaskToDriver(drivers, customerOrder);
        } else {
            String customerMessage = kafkaProducer.sendUnavailableMessage();
            notificationService.sendNotification(customerMessage, customerOrder.getUserEntity().getId());

        }
    }

    @Transactional
    @Override
    public void assignTaskToDriver(List<UserEntity> driverList, OrderEntity order) {
        new Thread(() -> {
            Random random = new Random();
            long startTime = System.currentTimeMillis();
            long timeLimit = 5 * 60 * 1000;


            UserEntity driver = (driverList.size() == 1) ? driverList.get(0) :
                    driverList.get(random.nextInt(0, driverList.size() - 1));

            driverList.remove(driver);

            DriverTaskEntity task = new DriverTaskEntity();
            task.addOrder(order);
            driver.addToDriverTask(task);
            driver.setDriverStatus(UNAVAILABLE);
            UserEntity savedDriver = userRepository.save(driver);

            savedDriver.setDriverTaskEntities(List.of(task));

            String driverMessage = kafkaProducer.sendTaskDetailsMessageToAssignedDriver(savedDriver.getEmail(),
                    savedDriver.getDriverTaskEntities().get(0).getId());

            notificationService.sendNotification(driverMessage, savedDriver.getId());

            while (System.currentTimeMillis() - startTime <= timeLimit) {
            }

            Long taskId = savedDriver.getDriverTaskEntities().get(0).getId();
            DriverTaskEntity driverTask = driverTaskRepo.findById(taskId)
                    .orElseThrow(() -> new TaskNotFoundException("Task not found."));
            if (driverTask.getTaskStatus() == null) {
                driverTask.setTaskStatus(REJECTED);
                driverTaskRepo.save(driverTask);

                if (!driverList.isEmpty()) {
                    assignTaskToDriver(driverList, order);
                }
            }
            if (driverTask.getTaskStatus().equals(REJECTED) && !driverList.isEmpty()) {
                assignTaskToDriver(driverList, order);
                List<UserEntity> admins = userRepository.findAllByRoles(ADMIN);
                admins
                        .forEach(admin -> notificationService
                                .sendNotification("A driver with name " + savedDriver
                                        .getFirstName() + " rejected a task assigned to him", admin
                                        .getId()));
            } else if (driverTask.getTaskStatus().equals(REJECTED)) {
                List<UserEntity> admins = userRepository.findAllByRoles(ADMIN);
                admins
                        .forEach(admin -> notificationService
                                .sendNotification("A driver with name " + savedDriver
                                        .getFirstName() + " rejected a task assigned to him", admin
                                        .getId()));
                String customerMessage = kafkaProducer.sendUnavailableMessage();
                notificationService.sendNotification(customerMessage, order.getUserEntity().getId());
                // TODO: tell the user that no driver is available at the moment . And notify the management via email
            } else {
                OrderEntity orderEntity = orderRepository.findOrderEntityById(order.getId())
                        .orElseThrow(() -> new OrderNotFoundException("Order not found!"));
                orderEntity.addTrackingLocation(TrackingLocationEntity.builder().location(order.getOrderDescriptionEntity().getPickUpLocation()).build());

                List<UserEntity> admins = userRepository.findAllByRoles(ADMIN);
                admins
                        .forEach(admin -> notificationService
                                .sendNotification("A driver with name " + savedDriver
                                        .getFirstName() + " has accepted a task assigned to him", admin
                                        .getId()));
                String customerMessage = kafkaProducer.sendAvailableMessage();
                String message = savedDriver.getFirstName() + " is en route to pick up your order ";
                notificationService.sendNotification(customerMessage, order.getUserEntity().getId());
                notificationService.sendNotification(message, order.getUserEntity().getId());

                log.info("Task id:------------->" + savedDriver.getDriverTaskEntities().get(0).getId());
                log.info("Driver email:----------->" + driver.getEmail());
            }
        }).start();
    }

    @Override
    public List<DriverTaskEntity> viewAllOrdersInDriversTask() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity driver = userRepository.findUserEntityByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Driver not found"));

        return driver.getDriverTaskEntities();
    }

    @Transactional
    @Override
    public UserOrderPage pageOrders(Integer pageNo, Integer pageSize) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("dateCreated").ascending());

        Slice<DriverTaskEntity> result = driverTaskRepo.findAllByDriverEntityEmailAndTaskStatusIsNull(email, pageable);

        return result == null ? new UserOrderPage() :
                UserOrderPage.builder()
                        .pageNo(result.getNumber())
                        .pageSize(result.getSize())
                        .lastPage(result.isLast())
                        .orderResponseList(result.get().map((task) -> {
                                    if (task.getOrderEntity().isEmpty()) {
                                        return null;
                                    }
                                    return UserOrderResponse.builder()
                                            .orderId(task.getId())
                                            .status(task.getOrderEntity().get(0).getStatus())
                                            .receiver(task.getOrderEntity().get(0).getOrderDescriptionEntity().getReceiverName())
                                            .dropOffLocation(task.getOrderEntity().get(0).getOrderDescriptionEntity().getDropOffLocation())
                                            .sender(task.getOrderEntity().get(0).getOrderDescriptionEntity().getSenderName())
                                            .pickUpLocation(task.getOrderEntity().get(0).getOrderDescriptionEntity().getPickUpLocation())
                                            .trackingNum(task.getOrderEntity().get(0).getTrackingNum())
                                            .imageURL(task.getOrderEntity().get(0).getUserEntity().getPictureUrl())
                                            .build();
                                })
                                .toList())
                        .build();
    }

    @Override
    public OrderHistory getDriverOrderHistory(Integer pageNo, Integer pageSize) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("dateCreated").ascending());

        Slice<DriverTaskEntity> taskEntities = driverTaskRepo.findByDriverEntityEmailAndTaskStatusIsNotNullOrderByIdDesc(email, pageable);


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

    @Override
    public AboutOrder findTrack(String trackingNum) {
        OrderEntity order = orderRepository.findByTrackingNum(trackingNum)
                .orElseThrow(() -> new OrderNotFoundException("Order not found!"));

        return AboutOrder.builder()
                .orderId(order.getId())
                .orderStatus(String.valueOf(order.getStatus()))
                .itemCategory(String.valueOf(order.getOrderDescriptionEntity().getItemCategory()))
                .email(order.getUserEntity().getEmail())
                .address(order.getUserEntity().getAddress())
                .deliveryPrice(order.getDeliveryCost())
                .firstName(order.getUserEntity().getFirstName())
                .lastName(order.getUserEntity().getLastName())
                .phoneNum(order.getUserEntity().getPhoneNumber())
                .imageURL(order.getUserEntity().getPictureUrl())
                .itemName(order.getOrderDescriptionEntity().getItemName())
                .dropOffLocation(order.getOrderDescriptionEntity().getDropOffLocation())
                .pickUpLocation(order.getOrderDescriptionEntity().getPickUpLocation())
                .senderName(order.getOrderDescriptionEntity().getSenderName())
                .receiverName(order.getOrderDescriptionEntity().getReceiverName())
                .receiverPhone(order.getOrderDescriptionEntity().getReceiverPhone())
                .trackingNum(order.getTrackingNum())
                .locationList(order.getTrackingLocationEntities().stream()
                        .map((location) -> TrackingLocationResponse.builder()
                                .locationId(location.getId())
                                .dateTime(String.valueOf(location.getDateCreated()))
                                .location(location.getLocation())
                                .build())
                        .toList())
                .build();
    }

    @Transactional
    @Override
    public String updateOrderStatus(String trackingNum, String status) {
        OrderEntity order = orderRepository.findByTrackingNum(trackingNum)
                .orElseThrow(() -> new OrderNotFoundException("Order not found!"));

        order.setStatus(OrderStatus.valueOf(status.toUpperCase()));

        orderRepository.save(order);

        return "Order status updated!";
    }
}
