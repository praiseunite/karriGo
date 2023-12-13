package com.decagon.karrigobe.services.user_service.serviceImplementation;

import com.decagon.karrigobe.entities.enums.ItemCategory;
import com.decagon.karrigobe.entities.enums.OrderStatus;
import com.decagon.karrigobe.entities.enums.TransactStatus;
import com.decagon.karrigobe.entities.model.*;
import com.decagon.karrigobe.exceptions.OrderCannotBeCanceledException;
import com.decagon.karrigobe.exceptions.OrderNotFoundException;
import com.decagon.karrigobe.exceptions.TransactionErrorException;
import com.decagon.karrigobe.exceptions.UserNotFoundException;
import com.decagon.karrigobe.payload.request.OrderDescriptionRequest;
import com.decagon.karrigobe.payload.response.*;
import com.decagon.karrigobe.repositories.OrderDescriptionRepository;
import com.decagon.karrigobe.repositories.OrderRepository;
import com.decagon.karrigobe.repositories.TransactionRepository;
import com.decagon.karrigobe.repositories.UserRepository;
import com.decagon.karrigobe.services.driver_service.DriverService;
import com.decagon.karrigobe.services.notification_service.NotificationService;
import com.decagon.karrigobe.services.user_service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.Date;
import java.util.Locale;

import static com.decagon.karrigobe.commons.CostConstants.*;
import static com.decagon.karrigobe.utils.CustomIdGenerator.trackingIdGenerator;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepo;
    private final UserRepository userRepo;
    private final TransactionRepository transactionRepo;
    private final DriverService driverService;
    private final OrderDescriptionRepository orderDescriptionRepo;
    private final NotificationService notificationService;

    /**
     * formula =>  Total cost = COST_PER_KM * KM + COST_PER_KG * KG + COST_PER_50K *(declaredPrice/50,000) +COST_FRAGILE + COST_PERISHABLE + COST_DOCUMENT
     */

    @Override
    public TransactionResponse getQuotation(OrderDescriptionRequest orderDesc) {

        BigDecimal totalPrice = calcTotalCost(orderDesc.getDistance(),
                orderDesc.getItemWeight(),
                orderDesc.getDeclaredPrice(),
                orderDesc.getItemCategory(), orderDesc.getWidth(),
                orderDesc.getLength(), orderDesc.getHeight());

        totalPrice = totalPrice.setScale(2, RoundingMode.HALF_EVEN);

        BigDecimal weightCost = BigDecimal.valueOf(orderDesc.getItemWeight() <= 5.0 ? 0 : orderDesc.getItemWeight() * COST_PER_KG);

        return TransactionResponse.builder()
                .totalAmount(totalPrice)
                .weightCost(weightCost)
                .build();
    }

    @Transactional
    @Override
    public TransactionResponse createOrder(OrderDescriptionRequest orderDesc) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user = userRepo.findUserEntityByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));

        OrderDescriptionEntity orderDescription = OrderDescriptionEntity.builder()
                .itemName(orderDesc.getItemName())
                .itemDescription(orderDesc.getItemDescription())
                .senderName(orderDesc.getSenderName())
                .senderPhone(orderDesc.getSenderPhone())
                .receiverName(orderDesc.getReceiverName())
                .receiverPhone(orderDesc.getReceiverPhone())
                .width(orderDesc.getWidth())
                .length(orderDesc.getLength())
                .height(orderDesc.getHeight())
                .declaredPrice(orderDesc.getDeclaredPrice())
                .itemWeight(orderDesc.getItemWeight())
                .itemCategory(ItemCategory.valueOf(orderDesc.getItemCategory().toUpperCase()))
                .pickUpLocation(orderDesc.getPickUpLocation())
                .dropOffLocation(orderDesc.getDropOffLocation())
                .distance(orderDesc.getDistance())
                .build();

        OrderDescriptionEntity savedDescription = orderDescriptionRepo.save(orderDescription);


        BigDecimal weightCost = BigDecimal.valueOf(orderDesc.getItemWeight() <= 5.0 ? 0 : orderDesc.getItemWeight() * COST_PER_KG);

        BigDecimal totalPrice = calcTotalCost(orderDesc.getDistance(),
                orderDesc.getItemWeight(),
                orderDesc.getDeclaredPrice(),
                orderDesc.getItemCategory(), orderDesc.getWidth(),
                orderDesc.getLength(), orderDesc.getHeight());

        totalPrice = totalPrice.setScale(2, RoundingMode.HALF_UP);

        NumberFormat formatter = NumberFormat.getCurrencyInstance(Locale.getDefault());
        String price = formatter.format(totalPrice);

        String priceDeclared = formatter.format(orderDesc.getDeclaredPrice());

        OrderEntity order = OrderEntity.builder()
                .status(OrderStatus.PENDING)
                .trackingNum("KG" + trackingIdGenerator())
                .userEntity(user)
                .orderDescriptionEntity(savedDescription)
                .deliveryCost(price)
                .build();

        OrderEntity savedOder = orderRepo.save(order);

//        checkOrderStatus(savedOder.getId());



        String receipt = generateReceipt(savedOder.getTrackingNum(), orderDesc.getItemName(),
                orderDesc.getItemDescription(), orderDesc.getItemWeight(),
                priceDeclared, orderDesc.getItemCategory(),
                orderDesc.getPickUpLocation(), orderDesc.getDropOffLocation(),
                price, orderDesc.getLength(), orderDesc.getHeight(), orderDesc.getWidth());

        TransactionEntity transaction = TransactionEntity.builder()
                .amount(totalPrice)
                .receipt(receipt)
                .orderEntity(savedOder)
                .status(TransactStatus.PENDING)
                .build();

        TransactionEntity savedTransaction = transactionRepo.save(transaction);

        return TransactionResponse.builder()
                .transactionId(savedTransaction.getId())
                .totalAmount(totalPrice)
                .weightCost(weightCost)
                .build();
    }


    @Transactional
    @Override
    public String cancelOder(Long orderId) {
        OrderEntity order = orderRepo.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found."));

        if (order.getStatus().equals(OrderStatus.ORDER_CONFIRMED)) {
            throw new OrderCannotBeCanceledException("Order can no longer be canceled!");
        }

        order.setStatus(OrderStatus.CANCELED);

        orderRepo.save(order);
        return "Order canceled successfully.";
    }

    @Transactional
    @Override
    public String validatePayment(PaymentRequest paymentRequest) {
        if (paymentRequest.getReferenceId().length() < 10) {
            throw new TransactionErrorException("Reference ID is invalid!");
        }
        TransactionEntity transaction = transactionRepo.findById(paymentRequest.getTransactionId())
                .orElseThrow(() -> new TransactionErrorException("Transaction not found."));

        transaction.setReferenceId(paymentRequest.getReferenceId());
        transaction.setStatus(TransactStatus.CONFIRMED);

        transactionRepo.save(transaction);

        checkOrderStatus(transaction.getOrderEntity().getId());

        return "Payment successful!";
    }

    @Transactional
    @Override
    public UserOrderPage getOrderHistory(Integer pageNo, Integer pageSize) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if (pageSize < 1) {
            pageSize = 1;
        }

        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Slice<OrderEntity> orderList = orderRepo.findAllByUserEntityEmailOrderByIdDesc(email, pageable);

        return UserOrderPage.builder()
                .pageNo(orderList.getNumber())
                .pageSize(orderList.getSize())
                .lastPage(orderList.isLast())
                .orderResponseList(orderList.stream().map(order -> UserOrderResponse.builder()
                        .orderId(order.getId())
                        .receiver(order.getOrderDescriptionEntity().getReceiverName())
                        .date(String.valueOf(order.getDateCreated()))
                        .amount(order.getDeliveryCost())
                        .dropOffLocation(order.getOrderDescriptionEntity().getDropOffLocation())
                        .pickUpLocation(order.getOrderDescriptionEntity().getPickUpLocation())
                        .status(order.getStatus())
                        .trackingNum(order.getTrackingNum())
                        .locationList(order.getTrackingLocationEntities().stream()
                                .map((location)-> TrackingLocationResponse.builder()
                                        .locationId(location.getId())
                                        .dateTime(String.valueOf(location.getDateCreated()))
                                        .location(location.getLocation())
                                        .build()).toList())
                        .build()).toList())
                .build();
    }

    @Override
    public UserOverView getUserOverView(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        OrderEntity order = orderRepo.findFirstByUserEntityEmailOrderByDateCreatedDesc(email)
                .orElseThrow(()-> new OrderNotFoundException("No order found!"));

        return UserOverView.builder()
                .senderName(order.getOrderDescriptionEntity().getSenderName())
                .senderAddress(order.getOrderDescriptionEntity().getPickUpLocation())
                .receiverAddress(order.getOrderDescriptionEntity().getDropOffLocation())
                .receiverName(order.getOrderDescriptionEntity().getReceiverName())
                .deliveryStatus(order.getDriverTaskEntity() == null ? new DeliveryStatus() : DeliveryStatus.builder()
                        .taskStatusDate(String.valueOf(order.getDriverTaskEntity().getDateCreated()))
                        .pickUpDate(String.valueOf(order.getDateCreated()))
                        .deliveryStatusDate(order.getStatus() == OrderStatus.OUT_FOR_DELIVERY ? String.valueOf(order.getDateModified()) : null)
                        .deliveryDate(order.getStatus() == OrderStatus.DELIVERED ? String.valueOf(order.getDateModified()) : null)
                        .build())
                .driverInfo(order.getDriverTaskEntity() == null ? new DriverInfo() :  DriverInfo.builder()
                        .driverId(order.getDriverTaskEntity().getDriverEntity().getId())
                        .firstName(order.getDriverTaskEntity().getDriverEntity().getFirstName())
                        .lastName(order.getDriverTaskEntity().getDriverEntity().getLastName())
                        .phoneNo(order.getDriverTaskEntity().getDriverEntity().getPhoneNumber())
                        .build())
                .locationList(order.getTrackingLocationEntities().stream()
                        .map((location)-> TrackingLocationResponse.builder()
                                .locationId(location.getId())
                                .dateTime(String.valueOf(location.getDateCreated()))
                                .location(location.getLocation())
                                .build()).toList())
                .build();
    }


    private BigDecimal calcTotalCost(Double distance, Double weight, Double declaredPrice, String itemCategory, Double width, Double length, Double height) {
        double area = (width * length * height) / 1000.0;
        return BigDecimal.valueOf(COST_PER_KM * distance)
                .add(BigDecimal.valueOf(weight <= 5.0 ? 0 : COST_PER_KG * weight))
                .add(BigDecimal.valueOf(COST_PER_50K * (declaredPrice / 50_000.0)))
                .add(BigDecimal.valueOf(itemCategory.equalsIgnoreCase("FRAGILE") ? COST_FRAGILE
                        : itemCategory.equalsIgnoreCase("PERISHABLES") ? COST_PERISHABLE
                        : itemCategory.equalsIgnoreCase("DOCUMENTS") ? COST_DOCUMENT : 0))
                .add(BigDecimal.valueOf(area < 10.0 ? 0 : area * COST_PER_AREA));
    }

    private String generateReceipt(String trackingId, String itemName, String description,
                                   Double weight, String declaredPrice, String category,
                                   String pickupLocation, String dropOffLocation, String deliveryCost,
                                   Double length, Double height, Double width) {

        return String.format("""
                        Tracking Number: %s
                        Item Name: %s
                        Description: %s
                        Weight: %s kg
                        Dimension: L: %smm  H: %smm  W: %smm
                        Declared price: %s
                        Item category: %s
                        Pickup location: %s
                        Drop-off location: %s
                        Cost of delivery: %s
                        """, trackingId, itemName, description, weight, length, height, width, declaredPrice,
                category, pickupLocation, dropOffLocation, deliveryCost);
    }

    @Transactional
    public void checkOrderStatus(Long orderId) {
        new Thread(() -> {
            long minutes = 1L;
            Date expireDate = new Date(System.currentTimeMillis() + 1000 * 60 * minutes);

            while (!new Date().after(expireDate)) {
            }

            OrderEntity orderEntity = orderRepo.findById(orderId)
                    .orElseThrow(() -> new OrderNotFoundException("Order not found"));

            if (!orderEntity.getStatus().equals(OrderStatus.CANCELED)) {
                orderEntity.setStatus(OrderStatus.ORDER_CONFIRMED);
                OrderEntity savedOrder = orderRepo.save(orderEntity);
                notificationService.sendNotification("your order has been created successfully",savedOrder.getUserEntity().getId());
                driverService.generateRandomOrder();
            }
        }).start();
    }
}
