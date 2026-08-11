package com.unifortrade.api.user.controller;

import com.unifortrade.api.auth.security.CustomUserDetails;
import com.unifortrade.api.user.dto.request.PatchUserRequest;
import com.unifortrade.api.user.dto.response.CurrentUserResponse;
import com.unifortrade.api.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class SelfController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CurrentUserResponse> getSelf(
        @AuthenticationPrincipal CustomUserDetails principal
    ) {
        return ResponseEntity.ok(userService.getSelf(principal.getId()));
    }

    @PatchMapping
    @PreAuthorize("hasAuthority('user:update:own')")
    public ResponseEntity<CurrentUserResponse> patchSelf(
        @Valid @RequestBody PatchUserRequest request,
        @AuthenticationPrincipal CustomUserDetails principal
    ) {
        return ResponseEntity.ok(
            userService.patch(principal.getId(), request)
        );
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('user:delete:own')")
    public ResponseEntity<Void> deleteSelf(
        @AuthenticationPrincipal CustomUserDetails principal
    ) {
        userService.delete(principal.getId());
        return ResponseEntity.noContent().build();
    }
}
