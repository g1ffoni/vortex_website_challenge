package com.unifortrade.api.listing.repository;

import com.unifortrade.api.listing.entity.Listing;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ListingRepository extends
        JpaRepository<Listing, Long>,
        JpaSpecificationExecutor<Listing> {

    List<Listing> findByOwnerId(Long ownerId);
}

