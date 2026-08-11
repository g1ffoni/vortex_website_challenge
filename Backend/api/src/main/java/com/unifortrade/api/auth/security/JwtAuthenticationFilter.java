package com.unifortrade.api.auth.security;

import com.unifortrade.api.auth.service.JwtService;
import com.unifortrade.api.common.exceptionhandling.exception.NotFoundException;
import com.unifortrade.api.user.entity.User;
import com.unifortrade.api.user.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String HEADER = "Authorization";
    private static final String PREFIX = "Bearer ";

    private final JwtService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String header = request.getHeader(HEADER);

        if (header != null && header.startsWith(PREFIX)) {
            String token = header.substring(PREFIX.length());
            String uniforId = jwtService.extractAccessTokenSubject(token);
            if (
                uniforId != null &&
                SecurityContextHolder.getContext().getAuthentication() == null
            ) {
                authenticate(uniforId);
            }
        }
        filterChain.doFilter(request, response);
    }

    private void authenticate(String uniforId) {
        User user;
        try {
            user = userService.findEntityByUniforId(uniforId);
        } catch (NotFoundException e) {
            return;
        }
        CustomUserDetails principal = new CustomUserDetails(user);
        var authentication = new UsernamePasswordAuthenticationToken(
            principal,
            null,
            principal.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
