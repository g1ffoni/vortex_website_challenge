package com.unifortrade.api.stats.service;

import com.unifortrade.api.listing.claim.entity.Claim;
import com.unifortrade.api.listing.claim.repository.ClaimRepository;
import com.unifortrade.api.stats.dto.response.StatsResponse;
import com.unifortrade.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatsService {

    private final ClaimRepository claimRepository;
    private final UserRepository userRepository;

    public StatsResponse getStats() {
        return new StatsResponse(
            claimRepository.countByStatus(Claim.ClaimStatus.COMPLETED),
            claimRepository.countCompletedSaleClaims(),
            claimRepository.countCompletedDonationClaims(),
            userRepository.count()
        );
    }
}

