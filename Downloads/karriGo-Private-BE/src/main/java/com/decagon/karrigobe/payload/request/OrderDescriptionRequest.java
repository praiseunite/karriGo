package com.decagon.karrigobe.payload.request;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDescriptionRequest {
    @NotBlank(message = "Item name is required.")
    @Size(min = 2, max = 100)
    private String itemName;

    @NotBlank(message = "Item Description is required.")
    @Size(min = 10, max = 1000)
    private String itemDescription;

    private Double length;
    private Double width;
    private Double height;

    private Double itemWeight;

    @NotNull(message = "Item cost price must be declared.")
    private Double declaredPrice;

    @NotBlank(message = "Item category is required.")
    @Size(min = 3, max = 20)
    private String itemCategory;

    @NotBlank(message = "Sender name is required.")
    @Size(min = 2, max = 50)
    private String senderName;

    @NotBlank(message = "Phone number is required.")
    @Digits(fraction = 0, integer = 11, message = "Check phone number and try again")
    private String senderPhone;

    @NotBlank(message = "Pickup location is required.")
    @Size(min = 2, max = 500)
    private String pickUpLocation;

    @NotBlank(message = "Drop-off location is required.")
    @Size(min = 2, max = 500)
    private String dropOffLocation;

    @NotBlank(message = "Sender name is required.")
    @Size(min = 2, max = 50)
    private String receiverName;

    @NotBlank(message = "Phone number is required.")
    @Digits(fraction = 0, integer = 11, message = "Check phone number and try again")
    private String receiverPhone;

    @NotNull(message = "Distance should not be blank.")
    private Double distance;
}
