package com.unifortrade.api.category.dto.response;

public record CategoryResponse(
    Long id,
    String name,
    String slug,
    String imageUrl
) {
}

