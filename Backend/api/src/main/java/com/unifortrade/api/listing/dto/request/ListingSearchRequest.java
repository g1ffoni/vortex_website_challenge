package com.unifortrade.api.listing.dto.request;

import com.unifortrade.api.common.validation.constraints.IdConstraints;
import com.unifortrade.api.listing.entity.Listing.ListingStatus;
import com.unifortrade.api.listing.entity.Listing.ListingType;
import com.unifortrade.api.listing.validationconstraints.PriceConstraints;
import java.math.BigDecimal;

public record ListingSearchRequest(
    String keyword,
    @IdConstraints(required = false) Long categoryId,
    @IdConstraints(required = false) Long ownerId,
    ListingType type,
    ListingStatus status,
    @PriceConstraints(required = false) BigDecimal minPrice,
    @PriceConstraints(required = false) BigDecimal maxPrice
) {}
