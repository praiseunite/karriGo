package com.decagon.karrigobe.payload.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AboutOrder {
    private Long orderId;
    private String senderName;
    private String receiverName;
    private String receiverPhone;
    private String trackingNum;
    private String orderStatus;
    private String itemName;
    private String itemCategory;
    private String pickUpLocation;
    private String dropOffLocation;
    private String deliveryPrice;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNum;
    private String address;
    private String imageURL;
    private List<TrackingLocationResponse> locationList;
}
