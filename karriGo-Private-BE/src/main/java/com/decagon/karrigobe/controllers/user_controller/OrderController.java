package com.decagon.karrigobe.controllers.user_controller;

import com.decagon.karrigobe.commons.PageConstant;
import com.decagon.karrigobe.payload.request.OrderDescriptionRequest;
import com.decagon.karrigobe.payload.response.*;
import com.decagon.karrigobe.services.user_service.LocationServices;
import com.decagon.karrigobe.services.user_service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {

    private final OrderService orderService;
    private final LocationServices locationServices;

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/quotation")
    public ResponseEntity<ApiResponse<TransactionResponse>> getQuotation(@Valid @RequestBody OrderDescriptionRequest descriptionRequest){
        return ResponseEntity.ok().body(new ApiResponse<>("Success", orderService.getQuotation(descriptionRequest)));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<TransactionResponse>> createOrder(@Valid @RequestBody OrderDescriptionRequest descriptionRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>("Order created successfully", orderService.createOrder(descriptionRequest)));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/transactions")
    public ResponseEntity<ApiResponse<String>> confirmTransaction(@Valid @RequestBody PaymentRequest paymentRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(orderService.validatePayment(paymentRequest)));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/cancel")
    public ResponseEntity<ApiResponse<String>> cancelOrder(@RequestParam("orderId") Long orderId){
        return ResponseEntity.ok().body(new ApiResponse<>(orderService.cancelOder(orderId)));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/track_order")
    public ResponseEntity<ApiResponse<OrderLocationResponse>> findTrack(@RequestParam("trackingNum") String trackingNum) {
        return ResponseEntity.ok().body(new ApiResponse<>("Success", locationServices.getTrackingLocation(trackingNum)));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/history")
    public ResponseEntity<ApiResponse<UserOrderPage>> getOrderHistory(
            @RequestParam(value = "pageNo", defaultValue = PageConstant.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = PageConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize
    ){
        return ResponseEntity.ok().body(new ApiResponse<>("Success", orderService.getOrderHistory(pageNo, pageSize)));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/overview")
    public ResponseEntity<ApiResponse<UserOverView>> getOverview(){
        return ResponseEntity.ok().body(new ApiResponse<>("Success", orderService.getUserOverView()));
    }
}
