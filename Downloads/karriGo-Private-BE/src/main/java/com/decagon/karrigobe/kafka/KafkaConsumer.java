package com.decagon.karrigobe.kafka;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class KafkaConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaConsumer.class);
  public void consume (String message){
        LOGGER.info(String.format("Message received -> %s", message));
  }
  public void consumeStatus(String message){
        LOGGER.info(String.format("Message received -> %s", message));
  }
  public void consumeTaskDetailsMessage(String message){
       LOGGER.info(String.format("Message received -> %s", message));
  }

}
