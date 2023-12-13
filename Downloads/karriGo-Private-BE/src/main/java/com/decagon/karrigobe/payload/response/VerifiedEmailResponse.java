package com.decagon.karrigobe.payload.response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifiedEmailResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String message;
}
