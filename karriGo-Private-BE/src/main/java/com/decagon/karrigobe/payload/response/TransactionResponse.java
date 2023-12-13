package com.decagon.karrigobe.payload.response;

import lombok.*;

import java.math.BigDecimal;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponse {
    private Long transactionId;
    private BigDecimal weightCost;
    private BigDecimal totalAmount;
}