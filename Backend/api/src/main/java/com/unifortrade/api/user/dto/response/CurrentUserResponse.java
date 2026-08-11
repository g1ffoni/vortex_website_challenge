package com.unifortrade.api.user.dto.response;

public record CurrentUserResponse(
    String uniforId,
    ProfileResponse profile,
    ContactInfoResponse contactInfo
) {
}

