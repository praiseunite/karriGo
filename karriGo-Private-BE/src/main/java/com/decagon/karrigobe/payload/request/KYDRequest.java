package com.decagon.karrigobe.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KYDRequest {
    @NotBlank
    private MultipartFile kydPicture;

    @Size(min = 12, max =12, message = "Id number too long or short")
    @NotBlank(message = "Id number cannot be empty!")
    private String idCardNumber;
}