package com.unifortrade.api.notification.mapper;

import com.unifortrade.api.notification.dto.response.NotificationResponse;
import com.unifortrade.api.notification.entity.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {

    public NotificationResponse toResponse(Notification notification) {
        return new NotificationResponse(
            notification.getId(),
            notification.getMessage(),
            notification.isDismissed(),
            notification.getCreatedAt(),
            notification.getLinkType(),
            notification.getLinkId()
        );
    }
}
