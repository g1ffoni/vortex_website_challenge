package com.unifortrade.api.notification.controller;

import com.unifortrade.api.auth.security.CustomUserDetails;
import com.unifortrade.api.notification.dto.response.NotificationResponse;
import com.unifortrade.api.notification.service.NotificationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/me/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<NotificationResponse>> findAll(
        @AuthenticationPrincipal CustomUserDetails principal
    ) {
        return ResponseEntity.ok(
            notificationService.findAllForUser(principal.getId())
        );
    }

    @PostMapping("/{id}/dismiss")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<NotificationResponse> dismiss(
        @AuthenticationPrincipal CustomUserDetails principal,
        @PathVariable Long id
    ) {
        return ResponseEntity.ok(
            notificationService.dismiss(id, principal.getId())
        );
    }
}
