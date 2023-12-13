package com.decagon.karrigobe.payload.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserOrderPage {
    private List<UserOrderResponse> orderResponseList;
    private int pageNo;
    private int pageSize;
    private Boolean lastPage;
}
