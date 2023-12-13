package com.decagon.karrigobe.payload.response;

import com.decagon.karrigobe.entities.model.OrderDescriptionEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDescriptionResponse {
    private String itemDescription;
    private String pickUpLocation;
    private String dropOffLocation;
}
