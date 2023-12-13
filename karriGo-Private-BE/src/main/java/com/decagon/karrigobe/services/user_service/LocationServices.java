package com.decagon.karrigobe.services.user_service;

import com.decagon.karrigobe.payload.response.OrderLocationResponse;

public interface LocationServices {
   OrderLocationResponse getTrackingLocation(String trackingNum);
}
