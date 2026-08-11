package com.unifortrade.api.listing.entity;

import com.unifortrade.api.category.entity.Category;
import com.unifortrade.api.common.entity.BaseEntity;
import com.unifortrade.api.user.entity.User;
import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(
    name = "listings",
    indexes = {
        @Index(name = "idx_listing_category", columnList = "category_id"),
        @Index(name = "idx_listing_owner", columnList = "owner_id"),
        @Index(name = "idx_listing_status", columnList = "status"),
    }
)
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Listing extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = true, length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ListingType type;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @ElementCollection
    @CollectionTable(
        name = "listing_gallery",
        joinColumns = @JoinColumn(name = "listing_id")
    )
    @Column(name = "image_url", length = 2048)
    @OrderColumn(name = "position")
    private List<String> gallery;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false, length = 20)
    private ListingStatus status = ListingStatus.ACTIVE;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    public void resolveType() {
        this.type =
            price.compareTo(BigDecimal.ZERO) == 0
                ? ListingType.DONATION
                : ListingType.SALE;
    }

    public enum ListingStatus {
        ACTIVE,
        CLAIMED,
        COMPLETED,
    }

    public enum ListingType {
        SALE,
        DONATION,
    }
}

