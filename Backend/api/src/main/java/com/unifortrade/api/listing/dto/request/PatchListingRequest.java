package com.unifortrade.api.listing.dto.request;

import com.unifortrade.api.common.validation.constraints.IdConstraints;
import com.unifortrade.api.common.validation.constraints.UrlConstraints;
import com.unifortrade.api.listing.validationconstraints.DescriptionConstraints;
import com.unifortrade.api.listing.validationconstraints.GalleryConstraints;
import com.unifortrade.api.listing.validationconstraints.PriceConstraints;
import com.unifortrade.api.listing.validationconstraints.TitleConstraints;
import java.math.BigDecimal;
import java.util.List;

public record PatchListingRequest(
    @TitleConstraints(required = false) String title,

    @DescriptionConstraints(required = false) String description,

    @PriceConstraints(required = false) BigDecimal price,

    @GalleryConstraints(maxImages = 10, required = false)
    List<@UrlConstraints String> gallery,

    @IdConstraints(required = false) Long categoryId
) {}

