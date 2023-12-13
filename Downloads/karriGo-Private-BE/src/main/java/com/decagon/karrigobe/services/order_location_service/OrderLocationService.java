package com.decagon.karrigobe.services.order_location_service;

import com.decagon.karrigobe.payload.response.OrderLocationResponse;

public interface OrderLocationService {
    OrderLocationResponse getLocationById(Long orderId);
    void deleteLocation(Long locationId);

    String updateLocation(String location, Long orderId);
}
