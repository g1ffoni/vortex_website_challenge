package com.unifortrade.api.auth.service;

import com.unifortrade.api.auth.dto.request.LoginRequest;
import com.unifortrade.api.auth.dto.request.RefreshRequest;
import com.unifortrade.api.auth.dto.response.AuthResponse;
import com.unifortrade.api.auth.security.CustomUserDetails;
import com.unifortrade.api.common.exceptionhandling.exception.UnauthorizedException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.uniforId(),
                    request.password()
                )
            );
        } catch (BadCredentialsException e) {
            throw new UnauthorizedException("Invalid credentials.");
        }

        CustomUserDetails user =
            (CustomUserDetails) authentication.getPrincipal();

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.of(accessToken, refreshToken);
    }

    public AuthResponse refresh(RefreshRequest request) {
        String uniforId;
        try {
            uniforId = jwtService.validateRefreshTokenAndGetSubject(
                request.refreshToken()
            );
        } catch (JwtException e) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        CustomUserDetails user;
        try {
            user = (CustomUserDetails) userDetailsService.loadUserByUsername(
                uniforId
            );
        } catch (UsernameNotFoundException e) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.of(newAccessToken, newRefreshToken);
    }

    public void logout() {
    }
}
