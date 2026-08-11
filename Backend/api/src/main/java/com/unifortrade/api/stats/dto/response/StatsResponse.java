package com.unifortrade.api.stats.dto.response;

public record StatsResponse(
    Long completedClaimsCount,
    Long completedSaleClaimsCount,
    Long completedDonationClaimsCount,
    Long registeredUsersCount
) {}
