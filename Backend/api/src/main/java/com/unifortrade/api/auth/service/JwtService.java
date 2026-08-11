package com.unifortrade.api.auth.service;

import com.unifortrade.api.auth.security.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final String CLAIM_TYPE = "type";
    private static final String TYPE_ACCESS = "access";
    private static final String TYPE_REFRESH = "refresh";
    private static final String CLAIM_USER_ID = "uid";
    private static final String TOKEN_ISSUER = "unifortrade";

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.access-token-expiration-minutes}")
    private Long accessTokenTtlMinutes;

    @Value("${app.jwt.refresh-token-expiration-days}")
    private Long refreshTokenTtlDays;

    public String generateAccessToken(CustomUserDetails user) {
        Date now = Date.from(Instant.now());
        Date exp = Date.from(
            Instant.now().plus(accessTokenTtlMinutes, ChronoUnit.MINUTES)
        );

        return Jwts.builder()
            .subject(user.getUsername())
            .id(UUID.randomUUID().toString())
            .claim(CLAIM_TYPE, TYPE_ACCESS)
            .claim(CLAIM_USER_ID, user.getId())
            .issuer(TOKEN_ISSUER)
            .issuedAt(now)
            .expiration(exp)
            .signWith(getSigningKey())
            .compact();
    }

    public String generateRefreshToken(CustomUserDetails user) {
        Date now = Date.from(Instant.now());
        Date exp = Date.from(
            Instant.now().plus(refreshTokenTtlDays, ChronoUnit.DAYS)
        );

        return Jwts.builder()
            .subject(user.getUsername())
            .id(UUID.randomUUID().toString())
            .claim(CLAIM_TYPE, TYPE_REFRESH)
            .issuer(TOKEN_ISSUER)
            .issuedAt(now)
            .expiration(exp)
            .signWith(getSigningKey())
            .compact();
    }

    public String extractAccessTokenSubject(String token) {
        try {
            Claims claims = parseClaims(token);
            String type = claims.get(CLAIM_TYPE, String.class);
            if (!TYPE_ACCESS.equals(type)) {
                return null;
            }
            return claims.getSubject();
        } catch (RuntimeException e) {
            return null;
        }
    }

    public String validateRefreshTokenAndGetSubject(String token) {
        Claims claims = parseClaims(token);
        String type = claims.get(CLAIM_TYPE, String.class);
        if (!TYPE_REFRESH.equals(type)) {
            throw new JwtException("Token is not a refresh token");
        }
        return claims.getSubject();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        } catch (IllegalArgumentException e) {
            throw new JwtException("Invalid token", e);
        }
    }
}
