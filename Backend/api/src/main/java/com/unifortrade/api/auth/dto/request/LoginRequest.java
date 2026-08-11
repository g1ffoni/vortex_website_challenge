package com.unifortrade.api.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank String uniforId,
    @NotBlank String password
) {
}

