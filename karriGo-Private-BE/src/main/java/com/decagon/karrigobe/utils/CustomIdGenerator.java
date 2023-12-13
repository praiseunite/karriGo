package com.decagon.karrigobe.utils;

import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.Configurable;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;

import java.io.Serializable;
import java.time.Instant;
import java.util.Properties;
import java.util.Random;

public class CustomIdGenerator {

    public static String trackingIdGenerator(){
        Instant now = Instant.now();

        String raw = String.valueOf(now).replace("T", "")
                .replace(":", "")
                .replace("-","")
                .replace("Z","")
                .replace(".","").substring(4, (now.toString().length()-12));


        Random random = new Random();
        random.nextInt(65, 90);

        String un = String.valueOf(random.nextInt());
        un = un.length() > 4 ? un.substring(un.length() - 4) : un;

        Integer last4 = Integer.parseInt(un);

        char first = (char)(Integer.parseInt(now.toString().substring(2, 4))+42);
        String first4 = raw.substring(0, 4);
        String second4 = raw.substring(4, 8);
        Integer third4 = Integer.parseInt(raw.substring(8));

        return String.format("%s%4s%s%4s%s%04d%s%04d", first,
                first4, (char)random.nextInt(65, 90),
                second4, (char)random.nextInt(65, 90),
                third4, (char)random.nextInt(65, 90),
                last4);
    }
}