package com.unifortrade.api.rating.dto.response;

import java.time.Instant;

public record RatingResponse(
    Long id,
    Long raterId,
    String raterDisplayName,
    Long ratedId,
    int score,
    String comment,
    Instant createdAt
) {
}

