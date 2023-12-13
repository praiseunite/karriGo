package com.decagon.karrigobe.services.admin_service;

import com.decagon.karrigobe.payload.response.*;

public interface AdminService {
    UserPageDTO getAllUsers(int pageNO, int pageSize, String sortBy, String sortDir);

    String disableADriversAccount(Long driverId);
    PaginatedResponse<UserResponse> pageView(String role, int pageNo, int pageSize, String sortBy);
    PaginatedResponse<DriverTaskResponse> pageTasks(Long driverId, int pageNo, int pageSize, String sortBy);
    UserAndDriverCount countUserAndDriver();
    OrderHistory getOrderHistory(Integer pageNo, Integer pageSize);

    String deleteDriver(Long driverId);
}
