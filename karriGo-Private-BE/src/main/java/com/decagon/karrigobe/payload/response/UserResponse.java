package com.decagon.karrigobe.payload.response;

import com.decagon.karrigobe.entities.enums.Gender;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String gender;
    private String pictureUrl;
    private String availableStatus;
    private String activeStatus;
}