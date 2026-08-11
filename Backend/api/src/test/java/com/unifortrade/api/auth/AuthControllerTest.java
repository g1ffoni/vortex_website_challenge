package com.unifortrade.api.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.unifortrade.api.auth.dto.request.LoginRequest;
import com.unifortrade.api.auth.dto.request.RefreshRequest;
import com.unifortrade.api.auth.dto.response.AuthResponse;
import com.unifortrade.api.support.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class AuthControllerTest extends IntegrationTest {

    @Test
    void login_withValidCredentials_returnsTokenPair() throws Exception {
        TestUser user = registerAndLogin("password123", "Login Flow");

        String response = mockMvc
            .perform(
                post("/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(new LoginRequest(user.uniforId(), "password123"))
                    )
            )
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        AuthResponse auth = fromJson(response, AuthResponse.class);
        assertThat(auth.accessToken()).isNotBlank();
        assertThat(auth.refreshToken()).isNotBlank();
        assertThat(auth.tokenType()).isEqualTo("Bearer");
    }

    @Test
    void login_withWrongPassword_returns401() throws Exception {
        TestUser user = registerAndLogin("password123", "Wrong Password");

        mockMvc
            .perform(
                post("/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(new LoginRequest(user.uniforId(), "wrong-password"))
                    )
            )
            .andExpect(status().isUnauthorized());
    }

    @Test
    void login_withUnknownUniforId_returns401NotServerError() throws Exception {
        mockMvc
            .perform(
                post("/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new LoginRequest("999999", "irrelevant")))
            )
            .andExpect(status().isUnauthorized());
    }

    @Test
    void refresh_withValidRefreshToken_returnsNewTokenPair() throws Exception {
        TestUser user = registerAndLogin("password123", "Refresh Flow");

        String response = mockMvc
            .perform(
                post("/auth/refresh")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new RefreshRequest(user.refreshToken())))
            )
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        AuthResponse auth = fromJson(response, AuthResponse.class);
        assertThat(auth.accessToken()).isNotBlank();
        assertThat(auth.refreshToken()).isNotBlank();
        assertThat(auth.refreshToken()).isNotEqualTo(user.refreshToken());
    }

    @Test
    void refresh_withGarbageToken_returns401() throws Exception {
        mockMvc
            .perform(
                post("/auth/refresh")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new RefreshRequest("not-a-real-token")))
            )
            .andExpect(status().isUnauthorized());
    }

    @Test
    void refresh_withAnAccessTokenInstead_returns401() throws Exception {
        TestUser user = registerAndLogin("password123", "Token Type Mixup");

        mockMvc
            .perform(
                post("/auth/refresh")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new RefreshRequest(user.accessToken())))
            )
            .andExpect(status().isUnauthorized());
    }

    @Test
    void logout_returnsNoContent() throws Exception {
        mockMvc.perform(post("/auth/logout")).andExpect(status().isNoContent());
    }
}
