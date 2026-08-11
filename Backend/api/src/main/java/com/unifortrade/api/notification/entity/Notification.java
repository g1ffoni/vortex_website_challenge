package com.unifortrade.api.notification.entity;

import com.unifortrade.api.common.entity.BaseEntity;
import com.unifortrade.api.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(
    name = "notifications",
    indexes = @Index(name = "idx_notification_user", columnList = "user_id")
)
@SQLRestriction("is_deleted = false")
public class Notification extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 500)
    private String message;

    @Builder.Default
    @Column(nullable = false)
    private boolean dismissed = false;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private LinkType linkType;

    private Long linkId;

    public enum LinkType {
        LISTING,
        USER,
    }
}
