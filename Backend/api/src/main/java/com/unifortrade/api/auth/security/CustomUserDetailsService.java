package com.unifortrade.api.auth.security;

import com.unifortrade.api.common.exceptionhandling.exception.NotFoundException;
import com.unifortrade.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String uniforId)
        throws UsernameNotFoundException {
        try {
            return new CustomUserDetails(
                userService.findEntityByUniforId(uniforId)
            );
        } catch (NotFoundException e) {
            throw new UsernameNotFoundException(
                "No user with uniforId " + uniforId,
                e
            );
        }
    }
}
