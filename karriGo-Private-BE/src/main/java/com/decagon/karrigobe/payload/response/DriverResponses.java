package com.decagon.karrigobe.payload.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DriverResponses {
    @Builder.Default
    private Long id = 0L;

    @Builder.Default
    private String firstName = "";

    @Builder.Default
    private String lastName = "";
}
