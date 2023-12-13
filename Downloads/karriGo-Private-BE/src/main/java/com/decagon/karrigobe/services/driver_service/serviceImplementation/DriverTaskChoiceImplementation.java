package com.decagon.karrigobe.services.driver_service.serviceImplementation;

import com.decagon.karrigobe.entities.enums.TaskStatus;
import com.decagon.karrigobe.entities.model.DriverTaskEntity;
import com.decagon.karrigobe.entities.model.UserEntity;
import com.decagon.karrigobe.exceptions.TaskNotFoundException;
import com.decagon.karrigobe.exceptions.UserNotFoundException;
import com.decagon.karrigobe.repositories.DriverTaskRepository;
import com.decagon.karrigobe.repositories.UserRepository;
import com.decagon.karrigobe.services.driver_service.DriverTaskChoice;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class DriverTaskChoiceImplementation implements DriverTaskChoice {
    private final DriverTaskRepository driverTaskRepo;
    private final UserRepository userRepo;

    @Override
    public String driverTaskResponse(Long taskId, String status) {

        DriverTaskEntity driverTask = driverTaskRepo.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Driver task not found."));

        driverTask.setTaskStatus(TaskStatus.valueOf(status.toUpperCase()));

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity driver = userRepo.findUserEntityByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Driver not found"));
        driver.setDriverTaskEntities(new ArrayList<>(List.of(driverTask)));

        userRepo.save(driver);


        if (status.equalsIgnoreCase("ACCEPTED")) {
            return "Task has been accepted";
        }
        return "Task has been rejected";


    }
}
