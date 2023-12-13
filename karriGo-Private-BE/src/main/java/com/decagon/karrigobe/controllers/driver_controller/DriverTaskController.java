package com.decagon.karrigobe.controllers.driver_controller;

import com.decagon.karrigobe.payload.response.ApiResponse;
import com.decagon.karrigobe.services.driver_service.DriverTaskChoice;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/drivers")
@RequiredArgsConstructor
public class DriverTaskController {
    private final DriverTaskChoice driverTaskChoice;
    @PostMapping("/task_status")
    public ResponseEntity<ApiResponse<String>> driverAcceptTask(@RequestParam("taskId") Long taskId,
                                                                @RequestParam("status") String status){
        return ResponseEntity.ok(new ApiResponse<>(driverTaskChoice.driverTaskResponse(taskId, status)));
    }
}
