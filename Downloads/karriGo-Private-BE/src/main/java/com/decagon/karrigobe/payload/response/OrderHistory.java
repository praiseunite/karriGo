package com.decagon.karrigobe.payload.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderHistory {
    private int pageNo;
    private int pageSize;
    private Boolean lastPage;
    private List<AboutOrder> aboutOrderList;
}
