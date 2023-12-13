package com.decagon.karrigobe.payload.request;

import jakarta.validation.constraints.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {

    @Size(max = 1000, message = "Receipt too long")
    @NotBlank(message = "Receipt cannot be empty!")
    private String receipt;

    @NotNull(message = "Amount cannot be empty!!!")
    private Double amount;
}