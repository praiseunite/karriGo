package com.decagon.karrigobe.services.update_user_profile.updateUserProfileImplementation;

import com.cloudinary.Cloudinary;
import com.decagon.karrigobe.entities.model.UserEntity;
import com.decagon.karrigobe.exceptions.NewAndOldPasswordException;
import com.decagon.karrigobe.exceptions.PasswordMismatchException;
import com.decagon.karrigobe.exceptions.UserNotFoundException;
import com.decagon.karrigobe.payload.request.ChangeAddressRequest;
import com.decagon.karrigobe.payload.request.ChangePasswordRequest;
import com.decagon.karrigobe.payload.request.UpdateProfileRequest;
import com.decagon.karrigobe.payload.response.UserResponse;
import com.decagon.karrigobe.repositories.UserRepository;
import com.decagon.karrigobe.services.update_user_profile.UpdateUserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateUserProfile implements UpdateUserServices {

    private final UserRepository userRepository;
    private final Cloudinary cloudinary;
    private final PasswordEncoder encoder;


    @Transactional
    @Override
    public String uploadPicture(MultipartFile multipartFile) throws IOException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user = userRepository.findUserEntityByEmail(email)
                .orElseThrow(()-> new UserNotFoundException("User does not exist"));

        String imageUrl = cloudinary.uploader()
                .upload(multipartFile.getBytes(), Map.of("public_id", UUID.randomUUID().toString()))
                .get("url")
                .toString();

        user.setPictureUrl(imageUrl);

        userRepository.save(user);

        return imageUrl;
    }


    @Override
    public String updateAddress(ChangeAddressRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user = userRepository.findUserEntityByEmail(email)
                .orElseThrow(()-> new UserNotFoundException("User does not exist"));

        user.setAddress(request.getAddress());
        userRepository.save(user);

        return "Address updated successfully";
    }


    @Override
    public String updatePassword(ChangePasswordRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if(!request.getNewPassword().equals(request.getConfirmNewPassword())){
            throw new PasswordMismatchException("Password does not match");
        }

        UserEntity user = userRepository.findUserEntityByEmail(email)
                .orElseThrow(()-> new UserNotFoundException("User does not exist"));

        if (!encoder.matches(request.getOldPassword(), user.getPassword())){
            throw new PasswordMismatchException("Wrong old password");
        }

        if (encoder.matches(request.getNewPassword(), user.getPassword())){
            throw new NewAndOldPasswordException("New and Old passwords cannot be the same");
        }

        user.setPassword(encoder.encode(request.getNewPassword()));

        userRepository.save(user);


        return "Password updated successfully";
    }

    @Override
    public UserResponse getUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user = userRepository.findUserEntityByEmail(email)
                .orElseThrow(()-> new UserNotFoundException("User not found"));
        return UserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .address(user.getAddress())
                .build();
    }


}
