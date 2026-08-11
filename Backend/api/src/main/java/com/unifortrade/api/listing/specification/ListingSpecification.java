package com.unifortrade.api.listing.specification;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.unifortrade.api.listing.dto.request.ListingSearchRequest;
import com.unifortrade.api.listing.entity.Listing;
import com.unifortrade.api.listing.entity.Listing.ListingStatus;
import com.unifortrade.api.listing.entity.Listing.ListingType;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ListingSpecification {

    public static Specification<Listing> withFilters(ListingSearchRequest filters) {
        List<Specification<Listing>> specs = Arrays.asList(
                keywordLike(filters.keyword()),
                hasCategoryId(filters.categoryId()),
                hasOwnerId(filters.ownerId()),
                hasType(filters.type()),
                hasStatus(filters.status()),
                priceGreaterThanOrEqual(filters.minPrice()),
                priceLessThanOrEqual(filters.maxPrice())
        ).stream().filter(Objects::nonNull).toList();

        return Specification.allOf(specs);
    }

    public static Specification<Listing> keywordLike(String keyword) {
        if (!StringUtils.hasText(keyword)) {
            return null;
        }
        String pattern = "%" + keyword.toLowerCase() + "%";
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("title")), pattern),
                cb.like(cb.lower(root.get("description")), pattern)
        );
    }

    public static Specification<Listing> hasCategoryId(Long categoryId) {
        if (categoryId == null) {
            return null;
        }
        return (root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId);
    }

    public static Specification<Listing> hasOwnerId(Long ownerId) {
        if (ownerId == null) {
            return null;
        }
        return (root, query, cb) -> cb.equal(root.get("owner").get("id"), ownerId);
    }

    public static Specification<Listing> hasType(ListingType type) {
        if (type == null) {
            return null;
        }
        return (root, query, cb) -> cb.equal(root.get("type"), type);
    }

    public static Specification<Listing> hasStatus(ListingStatus status) {
        if (status == null) {
            return null;
        }
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<Listing> priceGreaterThanOrEqual(BigDecimal minPrice) {
        if (minPrice == null) {
            return null;
        }
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice);
    }

    public static Specification<Listing> priceLessThanOrEqual(BigDecimal maxPrice) {
        if (maxPrice == null) {
            return null;
        }
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice);
    }
}

