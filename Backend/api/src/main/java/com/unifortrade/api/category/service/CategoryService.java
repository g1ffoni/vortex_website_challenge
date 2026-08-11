package com.unifortrade.api.category.service;

import com.unifortrade.api.category.dto.request.CreateCategoryRequest;
import com.unifortrade.api.category.dto.response.CategoryResponse;
import com.unifortrade.api.category.entity.Category;
import com.unifortrade.api.category.mapper.CategoryMapper;
import com.unifortrade.api.category.repository.CategoryRepository;
import com.unifortrade.api.common.exceptionhandling.exception.NotFoundException;
import com.unifortrade.api.common.util.SlugUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper mapper;

    public List<CategoryResponse> findAllByOrderByNameAsc() {
        return categoryRepository
            .findAllByOrderByNameAsc()
            .stream()
            .map(mapper::toResponse)
            .toList();
    }

    public CategoryResponse findById(Long id) {
        return mapper.toResponse(findEntityById(id));
    }

    public Category findEntityById(Long id) {
        Category category = categoryRepository
            .findById(id)
            .orElseThrow(() -> NotFoundException.of("Category", id));

        if (category.isDeleted()) {
            throw NotFoundException.of("Category", id);
        }

        return category;
    }

    @Transactional
    public CategoryResponse create(CreateCategoryRequest request) {
        Category category = Category.builder()
            .name(request.name())
            .slug(generateUniqueSlug(request.name()))
            .imageUrl(request.imageUrl())
            .build();

        return mapper.toResponse(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Long id) {
        Category category = findEntityById(id);
        category.setDeleted(true);
        categoryRepository.save(category);
    }

    private static final int MAX_SLUG_LENGTH = 120;

    private String generateUniqueSlug(String name) {
        String base = SlugUtil.slugify(name);
        String candidate = base;

        for (
            int suffix = 2;
            categoryRepository.countBySlugIncludingDeleted(candidate) > 0;
            suffix++
        ) {
            String suffixPart = "-" + suffix;
            int maxBaseLength = MAX_SLUG_LENGTH - suffixPart.length();
            String truncatedBase = base.length() > maxBaseLength
                ? base.substring(0, maxBaseLength)
                : base;
            candidate = truncatedBase + suffixPart;
        }

        return candidate;
    }
}
