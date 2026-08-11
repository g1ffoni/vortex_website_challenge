package com.unifortrade.api.notification.dto.response;

import com.unifortrade.api.notification.entity.Notification.LinkType;
import java.time.Instant;

public record NotificationResponse(
    Long id,
    String message,
    boolean dismissed,
    Instant createdAt,
    LinkType linkType,
    Long linkId
) {}
