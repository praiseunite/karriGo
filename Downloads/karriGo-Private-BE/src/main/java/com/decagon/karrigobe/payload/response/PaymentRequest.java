package com.decagon.karrigobe.payload.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    @NotNull(message = "Transaction id is empty!")
    private Long transactionId;
    @NotBlank(message = "Reference id is empty!")
    private String referenceId;
}
