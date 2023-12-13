package com.decagon.karrigobe.payload.response;

import lombok.*;

import java.time.LocalDateTime;

import static com.decagon.karrigobe.utils.DateUtils.toDateString;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class AuthResponse {

    private String accessToken;
    private String refreshToken;
    private String profilePic;
    private String dateTime;

    public AuthResponse(String accessToken, String refreshToken, String profilePic) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.profilePic = profilePic;
        this.dateTime = toDateString(LocalDateTime.now());
    }
}
