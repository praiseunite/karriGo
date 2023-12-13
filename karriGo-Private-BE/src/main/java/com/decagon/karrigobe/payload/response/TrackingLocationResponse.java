package com.decagon.karrigobe.payload.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TrackingLocationResponse {
    private Long locationId;
    private String location;
    private String dateTime;
}