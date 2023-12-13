package com.decagon.karrigobe.payload.response;

import com.decagon.karrigobe.entities.enums.OrderStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AllOrderResponse {
    private String trackingNum;
    private OrderStatus status;
    private String orderDate;
    private String pickUpLocation;
    private String dropOffLocation;
    private UserResponse user;
    @Builder.Default
    private DriverResponses driver = DriverResponses.builder().build();
}
