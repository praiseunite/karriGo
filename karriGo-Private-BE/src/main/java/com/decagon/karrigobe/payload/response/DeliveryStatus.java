package com.decagon.karrigobe.payload.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryStatus {
    private String taskStatusDate;
    private String deliveryStatusDate;
    private String pickUpDate;
    private String deliveryDate;
}
