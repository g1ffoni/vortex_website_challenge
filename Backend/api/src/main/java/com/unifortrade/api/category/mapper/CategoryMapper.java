package com.unifortrade.api.category.mapper;

import com.unifortrade.api.category.dto.response.CategoryResponse;
import com.unifortrade.api.category.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponse toResponse(Category category) {
        return new CategoryResponse(
            category.getId(),
            category.getName(),
            category.getSlug(),
            category.getImageUrl()
        );
    }
}

