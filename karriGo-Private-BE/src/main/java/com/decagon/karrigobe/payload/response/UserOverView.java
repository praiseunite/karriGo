package com.decagon.karrigobe.payload.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOverView {
    private String senderAddress;
    private String senderName;
    private String receiverAddress;
    private String receiverName;
    private DriverInfo driverInfo;
    private DeliveryStatus deliveryStatus;
    private List<TrackingLocationResponse> locationList;
}
