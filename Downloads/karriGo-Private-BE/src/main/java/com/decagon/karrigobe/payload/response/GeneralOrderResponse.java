package com.decagon.karrigobe.payload.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GeneralOrderResponse {
    List<AllOrderResponse> generalOrders;
    private int pageNo;
    private  int pageSize;
    private int totalPage;
    private Boolean lastPage;
}
