package com.decagon.karrigobe.kafka;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class EnvironmentService {

    private final Environment environment;

    public EnvironmentService(Environment environment) {
        this.environment = environment;
    }

    public String getVariable(String variableName) {
        return environment.getProperty(variableName);
    }

    public String getVariable(String variableName, String defaultValue) {
        return environment.getProperty(variableName, defaultValue);
    }
}
