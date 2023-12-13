package com.decagon.karrigobe.payload.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverInfo {
    private String phoneNo;
    private Long driverId;
    private String firstName;
    private String lastName;
}
