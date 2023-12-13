package com.decagon.karrigobe.payload.response;

import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KYDResponse {
    private Long kydId;
    private String kydUrl;
    private String idCardNumber;
}