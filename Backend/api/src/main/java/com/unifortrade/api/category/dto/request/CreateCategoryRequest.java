package com.unifortrade.api.category.dto.request;

import com.unifortrade.api.category.validationconstraints.NameConstraints;
import com.unifortrade.api.common.validation.constraints.UrlConstraints;

public record CreateCategoryRequest(
    @NameConstraints(required = true) String name,
    @UrlConstraints(required = true) String imageUrl
) {}
