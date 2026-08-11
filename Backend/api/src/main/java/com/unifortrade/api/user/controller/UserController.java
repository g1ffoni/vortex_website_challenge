package com.unifortrade.api.user.controller;

import com.unifortrade.api.user.dto.request.CreateUserRequest;
import com.unifortrade.api.user.dto.request.PatchUserRequest;
import com.unifortrade.api.user.dto.response.CurrentUserResponse;
import com.unifortrade.api.user.dto.response.ProfileResponse;
import com.unifortrade.api.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<ProfileResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/uniforId/{uniforId}")
    public ResponseEntity<ProfileResponse> findByUniforId(@PathVariable String uniforId) {
        return ResponseEntity.ok(userService.findByUniforId(uniforId));
    }

    @PostMapping
    public ResponseEntity<CurrentUserResponse> create(
        @Valid @RequestBody CreateUserRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
            userService.create(request)
        );
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('user:update:any')")
    public ResponseEntity<CurrentUserResponse> patch(
        @PathVariable Long id,
        @Valid @RequestBody PatchUserRequest request
    ) {
        return ResponseEntity.ok(userService.patch(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('user:delete:any')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

