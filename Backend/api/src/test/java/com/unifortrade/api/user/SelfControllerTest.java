package com.unifortrade.api.user;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.unifortrade.api.support.IntegrationTest;
import com.unifortrade.api.user.dto.request.PatchUserRequest;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class SelfControllerTest extends IntegrationTest {

    @Test
    void getSelf_asAuthenticatedUser_returnsCurrentUser() throws Exception {
        TestUser user = registerAndLogin("password123", "Current User");

        mockMvc
            .perform(get("/api/users/me").header(AUTH_HEADER, authHeader(user)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.uniforId").value(user.uniforId()))
            .andExpect(jsonPath("$.profile.id").value(user.id()))
            .andExpect(jsonPath("$.profile.name").value("Current User"));
    }

    @Test
    void getSelf_withoutAuth_returns403() throws Exception {
        mockMvc.perform(get("/api/users/me")).andExpect(status().isForbidden());
    }

    @Test
    void getSelf_withInvalidToken_returns403() throws Exception {
        mockMvc
            .perform(
                get("/api/users/me").header(AUTH_HEADER, "Bearer not-a-real-token")
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void patchSelf_withoutAuth_returns403() throws Exception {
        mockMvc
            .perform(
                patch("/api/users/me")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new PatchUserRequest("New Name", null, null, null, null)))
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void patchSelf_asOwner_updatesAndReturns200() throws Exception {
        TestUser user = registerAndLogin("password123", "Original Name");

        mockMvc
            .perform(
                patch("/api/users/me")
                    .header(AUTH_HEADER, authHeader(user))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new PatchUserRequest(
                                "Updated Name",
                                "New bio",
                                null,
                                null,
                                null
                            )
                        )
                    )
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.profile.name").value("Updated Name"));
    }

    @Test
    void patchSelf_withDuplicateEmail_returns409() throws Exception {
        TestUser first = registerAndLogin("password123", "First");
        TestUser second = registerAndLogin("password123", "Second");
        String firstEmail = userRepository
            .findById(first.id())
            .orElseThrow()
            .getContactInfo()
            .getEmail();

        mockMvc
            .perform(
                patch("/api/users/me")
                    .header(AUTH_HEADER, authHeader(second))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new PatchUserRequest(null, null, null, null, firstEmail)
                        )
                    )
            )
            .andExpect(status().isConflict());
    }

    @Test
    void patchSelf_isReflectedOnSubsequentRead() throws Exception {
        TestUser user = registerAndLogin("password123", "Before Patch");

        mockMvc
            .perform(
                patch("/api/users/me")
                    .header(AUTH_HEADER, authHeader(user))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new PatchUserRequest("After Patch", null, null, null, null)))
            )
            .andExpect(status().isOk());

        mockMvc
            .perform(get("/api/users/{id}", user.id()))
            .andExpect(jsonPath("$.name").value("After Patch"));

        assertThat(
            userRepository.findById(user.id()).orElseThrow().getProfile().getName()
        ).isEqualTo("After Patch");
    }

    @Test
    void deleteSelf_withoutAuth_returns403() throws Exception {
        mockMvc.perform(delete("/api/users/me")).andExpect(status().isForbidden());
    }

    @Test
    void deleteSelf_asOwner_returns204AndRemovesAccount() throws Exception {
        TestUser user = registerAndLogin("password123", "Self Deleting");

        mockMvc
            .perform(delete("/api/users/me").header(AUTH_HEADER, authHeader(user)))
            .andExpect(status().isNoContent());

        mockMvc
            .perform(get("/api/users/{id}", user.id()))
            .andExpect(status().isNotFound());
    }
}
