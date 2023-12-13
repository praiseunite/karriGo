package com.decagon.karrigobe.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {

    public String sendUnavailableMessage(){
        return "DRIVER IS BUSY";
    }

    public String sendAvailableMessage(){
        return "ORDER HAS BEEN ASSIGNED TO A DRIVER";
    }

    public String sendTaskDetailsMessageToAssignedDriver(String driverEmail, Long taskId) {
        String acceptUrl = "http://localhost:2006/driver/notification?taskId="+ taskId +"&status=accepted";
        String rejectUrl = "http://localhost:2006/driver/notification?taskId="+ taskId +"&status=rejected";
        return "you have been assigned a task " +
                "<a href=\"" + acceptUrl + "\" style=\"color: blue;\">ACCEPT</a>" +
                "&nbsp;" +
                "<a href=\"" + rejectUrl + "\" style=\"color: red;\">REJECT</a>";
    }
}
