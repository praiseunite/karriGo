package com.decagon.karrigobe.entities.model;

import com.decagon.karrigobe.entities.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
@Builder
public class DriverTaskEntity extends BaseEntity {
    @Enumerated(EnumType.STRING)
    private TaskStatus taskStatus;

    @OneToMany(mappedBy = "driverTaskEntity", fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST,CascadeType.REFRESH})
    private List<OrderEntity> orderEntity = new ArrayList<>();

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "driver_id")
    private UserEntity driverEntity;

    public void  addOrder(OrderEntity order){
        orderEntity.add(order);
        order.setDriverTaskEntity(this);
    }

}
