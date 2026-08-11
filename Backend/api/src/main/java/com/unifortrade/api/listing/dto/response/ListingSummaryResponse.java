package com.unifortrade.api.listing.dto.response;

import java.math.BigDecimal;

import com.unifortrade.api.listing.entity.Listing.ListingStatus;

public record ListingSummaryResponse(
        Long id,
        String title,
        BigDecimal price,
        String thumbnailUrl,
        ListingStatus status,
        String categoryName
) {
}

