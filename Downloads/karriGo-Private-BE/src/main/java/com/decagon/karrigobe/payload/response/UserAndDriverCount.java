package com.decagon.karrigobe.payload.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAndDriverCount {
    private Long driverCount;
    private Long userCount;
}
