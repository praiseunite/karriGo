package com.decagon.karrigobe.entities.model;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "notification_table")
public class NotificationMessageEntity extends BaseEntity {
    @Column(name = "notification_message", columnDefinition = "TEXT")
    private String message;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE
            , CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "users_id")
    private UserEntity users;
}