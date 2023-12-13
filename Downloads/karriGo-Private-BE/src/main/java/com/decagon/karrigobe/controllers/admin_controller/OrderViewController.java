package com.decagon.karrigobe.controllers.admin_controller;

import com.decagon.karrigobe.commons.PageConstant;
import com.decagon.karrigobe.payload.response.*;
import com.decagon.karrigobe.services.admin_service.OrderViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admins")
public class OrderViewController {
    private final OrderViewService orderViewService;

    @GetMapping("/orders/search/tracking_no")
    public ResponseEntity<ApiResponse<List<AllOrderResponse>>> searchByTrackingNum(@RequestParam("trackingNum") String trackingNum){
        return ResponseEntity.ok().body(new ApiResponse<>("Successful", orderViewService.searchByTrackingNum(trackingNum)));
    }

    @GetMapping("/orders/search/{email}")
    public ResponseEntity<ApiResponse<List<AllOrderResponse>>> searchByEmail(@PathVariable("email") String email,
             @RequestParam(value = "pageNo", defaultValue = PageConstant.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
              @RequestParam(value = "pageSize", defaultValue = PageConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize
    ){
        return ResponseEntity.ok().body(new ApiResponse<>("Successful", orderViewService.searchByEmail(email, pageNo, pageSize)));
    }
    @GetMapping("/all-orders")
    private ResponseEntity<ApiResponse<GeneralOrderResponse>> getAllOrdersByAdmin(
            @RequestParam(value = "pageNo", defaultValue = PageConstant.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = PageConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize
    ){
//        GeneralOrderResponse generalOrderResponse = orderViewService.getAllOrders(pageNo,pageSize,sortBy,sortDir);
        return ResponseEntity.ok().body(new ApiResponse<>("Success", orderViewService.getAllOrders(pageNo, pageSize)));
    }

    @GetMapping("/unassigned_order")
    public ResponseEntity<ApiResponse<PaginatedResponse<AboutOrder>>> getAllUnAssignedOrder(
            @RequestParam(value = "pageNo", defaultValue = PageConstant.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = PageConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize
    ){
        return ResponseEntity.ok().body(new ApiResponse<>("Success", orderViewService.getAllUnAssignedOrder(pageNo, pageSize)));
    }
}
