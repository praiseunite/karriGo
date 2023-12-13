package com.decagon.karrigobe.payload.response;

import com.decagon.karrigobe.entities.enums.TaskStatus;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DriverTaskResponse {
    private Long id;
    private TaskStatus taskStatus;
    private List<OrderResponse> orderResponse;
}