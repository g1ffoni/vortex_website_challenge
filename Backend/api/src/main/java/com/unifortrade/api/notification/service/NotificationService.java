package com.unifortrade.api.notification.service;

import com.unifortrade.api.common.exceptionhandling.exception.ForbiddenException;
import com.unifortrade.api.common.exceptionhandling.exception.NotFoundException;
import com.unifortrade.api.notification.dto.response.NotificationResponse;
import com.unifortrade.api.notification.entity.Notification;
import com.unifortrade.api.notification.entity.Notification.LinkType;
import com.unifortrade.api.notification.mapper.NotificationMapper;
import com.unifortrade.api.notification.repository.NotificationRepository;
import com.unifortrade.api.user.entity.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificationService {

    private final NotificationRepository repository;
    private final NotificationMapper mapper;

    public List<NotificationResponse> findAllForUser(Long userId) {
        return repository
            .findByUserIdOrderByCreatedAtDesc(userId)
            .stream()
            .map(mapper::toResponse)
            .toList();
    }

    @Transactional
    public NotificationResponse dismiss(Long notificationId, Long requesterId) {
        Notification notification = findEntityById(notificationId);

        if (!notification.getUser().getId().equals(requesterId)) {
            throw new ForbiddenException(
                "You don't own this notification."
            );
        }

        notification.setDismissed(true);
        return mapper.toResponse(repository.save(notification));
    }

    @Transactional
    public void create(
        User recipient,
        String message,
        LinkType linkType,
        Long linkId
    ) {
        Notification notification = Notification.builder()
            .user(recipient)
            .message(message)
            .linkType(linkType)
            .linkId(linkId)
            .build();

        repository.save(notification);
    }

    @Transactional
    public void create(User recipient, String message) {
        create(recipient, message, null, null);
    }

    private Notification findEntityById(Long id) {
        return repository
            .findById(id)
            .orElseThrow(() -> NotFoundException.of("Notification", id));
    }
}
