package com.unifortrade.api.listing.dto.response;

public record ContactResponse(
    Long userId,
    String displayName,
    String email,
    String phone
) {
}

