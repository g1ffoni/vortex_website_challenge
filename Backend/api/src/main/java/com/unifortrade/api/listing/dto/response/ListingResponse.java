package com.unifortrade.api.listing.dto.response;

import com.unifortrade.api.category.dto.response.CategoryResponse;
import com.unifortrade.api.listing.entity.Listing.ListingStatus;
import com.unifortrade.api.listing.entity.Listing.ListingType;
import com.unifortrade.api.user.dto.response.ProfileResponse;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record ListingResponse(
    Long id,

    String title,

    String description,

    ListingType type,

    BigDecimal price,

    List<String> gallery,

    ListingStatus status,

    CategoryResponse category,

    ProfileResponse owner,

    Instant createdAt
) {}

