package com.unifortrade.api.listing.claim.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.unifortrade.api.listing.claim.entity.Claim;

public interface ClaimRepository extends JpaRepository<Claim, Long> {

    Optional<Claim> findByListingIdAndStatus(Long listingId, Claim.ClaimStatus status);

    long countByStatus(Claim.ClaimStatus status);

    @Query("SELECT COUNT(c) FROM Claim c WHERE c.status = 'COMPLETED' AND c.listing.price > 0")
    long countCompletedSaleClaims();

    @Query("SELECT COUNT(c) FROM Claim c WHERE c.status = 'COMPLETED' AND c.listing.price = 0")
    long countCompletedDonationClaims();

    @Query("""
        SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Claim c
        WHERE c.status = 'COMPLETED'
          AND ((c.claimer.id = :userAId AND c.listing.owner.id = :userBId)
            OR (c.claimer.id = :userBId AND c.listing.owner.id = :userAId))
        """)
    boolean existsCompletedClaimBetweenUsers(@Param("userAId") Long userAId, @Param("userBId") Long userBId);
}

