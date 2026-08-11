package com.unifortrade.api.rating.dto.response;

import java.util.List;

public record UserRatingsResponse(
    List<RatingResponse> ratings,
    Double average,
    long count
) {
}

