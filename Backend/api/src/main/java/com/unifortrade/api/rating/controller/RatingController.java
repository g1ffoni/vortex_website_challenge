package com.unifortrade.api.rating.controller;

import com.unifortrade.api.auth.security.CustomUserDetails;
import com.unifortrade.api.rating.dto.request.CreateRatingRequest;
import com.unifortrade.api.rating.dto.response.RatingResponse;
import com.unifortrade.api.rating.dto.response.UserRatingsResponse;
import com.unifortrade.api.rating.service.RatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/{userId}/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    @PostMapping
    @PreAuthorize("hasAuthority('rating:create')")
    public ResponseEntity<RatingResponse> create(
        @AuthenticationPrincipal CustomUserDetails principal,
        @PathVariable Long userId,
        @Valid @RequestBody CreateRatingRequest request
    ) {
        RatingResponse response = ratingService.create(
            principal.getUser(),
            userId,
            request.score(),
            request.comment()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<UserRatingsResponse> findByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(ratingService.findByRatedId(userId));
    }
}

