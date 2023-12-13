package com.decagon.karrigobe.services.user_service;

import com.decagon.karrigobe.payload.request.OrderDescriptionRequest;
import com.decagon.karrigobe.payload.response.PaymentRequest;
import com.decagon.karrigobe.payload.response.TransactionResponse;
import com.decagon.karrigobe.payload.response.UserOrderPage;
import com.decagon.karrigobe.payload.response.UserOverView;

public interface OrderService {
    TransactionResponse getQuotation(OrderDescriptionRequest orderDescriptionRequest);
    TransactionResponse createOrder(OrderDescriptionRequest orderDescriptionRequest);
    String cancelOder(Long orderId);
    String validatePayment(PaymentRequest paymentResponse);
    UserOrderPage getOrderHistory(Integer pageNo, Integer pageSize);
    UserOverView getUserOverView();
}
