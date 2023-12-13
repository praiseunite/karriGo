package com.decagon.karrigobe.services.update_user_profile;

import com.decagon.karrigobe.payload.request.ChangeAddressRequest;
import com.decagon.karrigobe.payload.request.ChangePasswordRequest;
import com.decagon.karrigobe.payload.response.UserResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UpdateUserServices {
    String uploadPicture(MultipartFile multipartFile) throws IOException;
    String updateAddress(ChangeAddressRequest request);
    String updatePassword(ChangePasswordRequest request);
    UserResponse getUser();
}
