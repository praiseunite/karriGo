package com.decagon.karrigobe.payload.request;

import com.decagon.karrigobe.entities.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    @NotNull
   private OrderStatus status;
}