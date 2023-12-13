package com.decagon.karrigobe.controllers.order_location_controller;

import com.decagon.karrigobe.payload.response.ApiResponse;
import com.decagon.karrigobe.payload.response.OrderLocationResponse;
import com.decagon.karrigobe.services.order_location_service.OrderLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/locations")
public class OrderLocationController {
    private final OrderLocationService orderLocationService;

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderLocationResponse> getLocationById(@PathVariable("orderId") Long orderId){
        return ResponseEntity.ok(orderLocationService.getLocationById(orderId));
    }

    @PostMapping("/current_location")
    public ResponseEntity<ApiResponse<String>> updateLocation(@RequestParam("location") String location,
                                                              @RequestParam("orderId") Long orderId){
        return ResponseEntity.ok().body(new ApiResponse<>(orderLocationService.updateLocation(location, orderId)));
    }

    @DeleteMapping("/{locationId}")
    public void deleteLocation(@PathVariable Long locationId){
        orderLocationService.deleteLocation(locationId);
    }
}
