package com.decagon.karrigobe.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

import java.util.List;

@Getter
@Setter
@Builder
public class UserPageDTO {

    private int pageNo;
    private  int pageSize;
    private Boolean lastPage;
    private List<UserResponse> userResponseList;

}
