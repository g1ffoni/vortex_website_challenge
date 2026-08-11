package com.unifortrade.api.auth.dto.response;

public record AuthResponse(
    String accessToken,
    String refreshToken,
    String tokenType
) {
    public static AuthResponse of(String accessToken, String refreshToken) {
        return new AuthResponse(accessToken, refreshToken, "Bearer");
    }
}

