package com.decagon.karrigobe.controllers.driver_controller;

import com.decagon.karrigobe.commons.PageConstant;
import com.decagon.karrigobe.payload.response.AboutOrder;
import com.decagon.karrigobe.payload.response.ApiResponse;
import com.decagon.karrigobe.payload.response.OrderHistory;
import com.decagon.karrigobe.payload.response.UserOrderPage;
import com.decagon.karrigobe.services.driver_service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/drivers")
public class DriverOrderController {
    private final DriverService driverService;

    @GetMapping("/orders")
    private ResponseEntity<ApiResponse<UserOrderPage>> getAllOrdersByAdmin(
            @RequestParam(value = "pageNo", defaultValue = PageConstant.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = PageConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize
    ){
        return ResponseEntity.ok().body(new ApiResponse<>("Success", driverService.pageOrders(pageNo, pageSize)));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<OrderHistory>> getDriverHistory(
            @RequestParam(value = "pageNo", defaultValue = PageConstant.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = PageConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize
    ){
        return ResponseEntity.ok().body(new ApiResponse<>("Success", driverService.getDriverOrderHistory(pageNo, pageSize)));
    }

    @GetMapping("/find_track")
    public ResponseEntity<ApiResponse<AboutOrder>> findTrack(@RequestParam("trackingNum") String trackingNum){
        return ResponseEntity.ok().body(new ApiResponse<>("Success", driverService.findTrack(trackingNum)));
    }

    @PutMapping("/order_status_update")
    public ResponseEntity<ApiResponse<String>> updateOrder(@RequestParam("status") String status,
                                                           @RequestParam("trackingNum") String trackingNum){
        return ResponseEntity.ok().body(new ApiResponse<>(driverService.updateOrderStatus(trackingNum, status)));
    }
}
