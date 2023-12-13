package com.decagon.karrigobe.payload.response;


import com.decagon.karrigobe.entities.enums.OrderStatus;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse  {
    private Long orderId;
    private OrderStatus status;
    private LocalDateTime time;
}