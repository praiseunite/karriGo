package com.decagon.karrigobe.entities.model;

import com.decagon.karrigobe.entities.enums.TransactStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "transaction_table")
public class TransactionEntity extends BaseEntity{

    @Column(nullable = false,length = 1000)
    private String receipt;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private TransactStatus status;

    @Column(length = 20)
    private String referenceId;

    @OneToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "order_id")
    private OrderEntity orderEntity;

}
