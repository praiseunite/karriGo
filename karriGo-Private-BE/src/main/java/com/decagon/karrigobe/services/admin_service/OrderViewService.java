package com.decagon.karrigobe.services.admin_service;

import com.decagon.karrigobe.payload.response.AboutOrder;
import com.decagon.karrigobe.payload.response.AllOrderResponse;
import com.decagon.karrigobe.payload.response.GeneralOrderResponse;
import com.decagon.karrigobe.payload.response.PaginatedResponse;

import java.util.List;

public interface OrderViewService {
    List<AllOrderResponse> searchByEmail(String searchMethod, int pageNo, int pageSize);
    List<AllOrderResponse> searchByTrackingNum(String trackingNum);
    GeneralOrderResponse getAllOrders(int pageNo, int pageSize);
    PaginatedResponse<AboutOrder> getAllUnAssignedOrder(Integer pageNo, Integer pageSize);
}
