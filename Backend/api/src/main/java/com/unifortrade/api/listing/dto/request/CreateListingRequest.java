package com.unifortrade.api.listing.dto.request;

import com.unifortrade.api.common.validation.constraints.IdConstraints;
import com.unifortrade.api.common.validation.constraints.UrlConstraints;
import com.unifortrade.api.listing.validationconstraints.DescriptionConstraints;
import com.unifortrade.api.listing.validationconstraints.GalleryConstraints;
import com.unifortrade.api.listing.validationconstraints.PriceConstraints;
import com.unifortrade.api.listing.validationconstraints.TitleConstraints;
import java.math.BigDecimal;
import java.util.List;

public record CreateListingRequest(
    @TitleConstraints(required = true) String title,
    @DescriptionConstraints(required = false) String description,
    @PriceConstraints(required = true) BigDecimal price,
    @GalleryConstraints(maxImages = 10, required = true)
    List<@UrlConstraints String> gallery,
    @IdConstraints(required = true) Long categoryId
) {}

