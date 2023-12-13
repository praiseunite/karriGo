package com.decagon.karrigobe.services.order_location_service.serviceImplimentation;

import com.decagon.karrigobe.entities.enums.OrderStatus;
import com.decagon.karrigobe.entities.model.OrderDescriptionEntity;
import com.decagon.karrigobe.entities.model.OrderEntity;
import com.decagon.karrigobe.entities.model.OrderLocationEntity;
import com.decagon.karrigobe.entities.model.TrackingLocationEntity;
import com.decagon.karrigobe.exceptions.LocationNotFoundException;
import com.decagon.karrigobe.exceptions.OrderNotFoundException;
import com.decagon.karrigobe.payload.response.OrderLocationResponse;
import com.decagon.karrigobe.repositories.OrderDescriptionRepository;
import com.decagon.karrigobe.repositories.OrderLocationRepository;
import com.decagon.karrigobe.repositories.OrderRepository;
import com.decagon.karrigobe.services.order_location_service.OrderLocationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class OrderLocationServiceImpl implements OrderLocationService {
    private final ModelMapper modelMapper = new ModelMapper();
    private final OrderLocationRepository orderLocationRepository;
    private final OrderRepository orderRepository;
    private final OrderDescriptionRepository orderDescriptionRepository;

    @Override
    public OrderLocationResponse getLocationById(Long orderId) {
        OrderEntity order = orderRepository.findOrderEntityById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found!"));

        return OrderLocationResponse.builder()
                .orderId(order.getId())
                .dropOffLocation(order.getOrderDescriptionEntity().getDropOffLocation())
                .pickUpLocation(order.getOrderDescriptionEntity().getPickUpLocation())
                .build();
    }

    @Override
    public void deleteLocation(Long locationId) {
        OrderLocationEntity existingLocation = orderLocationRepository.findById(locationId)
                .orElseThrow(() -> new LocationNotFoundException("The location with id: " +locationId+ " was not found"));

        orderLocationRepository.delete(existingLocation);
    }

    @Override
    public String updateLocation(String location, Long locationId) {
        OrderEntity order = orderRepository.findById(locationId)
                .orElseThrow(()-> new OrderNotFoundException("Order not found!"));

        order.addTrackingLocation(TrackingLocationEntity.builder()
                        .location(location)
                .build());

        if (order.getStatus() == OrderStatus.ORDER_CONFIRMED){
            order.setStatus(OrderStatus.OUT_FOR_DELIVERY);
        }

        orderRepository.save(order);
        return "Location updated successfully!";
    }
}
