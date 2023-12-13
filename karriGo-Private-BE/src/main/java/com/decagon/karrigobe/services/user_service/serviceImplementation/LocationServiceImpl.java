package com.decagon.karrigobe.services.user_service.serviceImplementation;

import com.decagon.karrigobe.entities.model.OrderEntity;
import com.decagon.karrigobe.entities.model.TrackingLocationEntity;
import com.decagon.karrigobe.exceptions.OrderNotFoundException;
import com.decagon.karrigobe.payload.response.OrderLocationResponse;
import com.decagon.karrigobe.repositories.OrderRepository;
import com.decagon.karrigobe.repositories.TrackingLocationRepository;
import com.decagon.karrigobe.services.user_service.LocationServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LocationServiceImpl implements LocationServices {
    private final TrackingLocationRepository locationRepo;
    private final OrderRepository orderRepo;

    @Override
    public OrderLocationResponse getTrackingLocation(String trackingNum){
        OrderEntity order = orderRepo.findByTrackingNum(trackingNum)
                .orElseThrow(()-> new OrderNotFoundException("No other with tracking number: "+trackingNum));

        System.out.println("Order id is: "+order.getId());

        return OrderLocationResponse.builder()
                .orderId(order.getId())
                .pickUpLocation(order.getOrderDescriptionEntity().getPickUpLocation())
                .dropOffLocation(order.getOrderDescriptionEntity().getDropOffLocation())
                .build();
    }
}
