package com.unifortrade.api.user;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.unifortrade.api.listing.dto.response.ListingResponse;
import com.unifortrade.api.support.IntegrationTest;
import com.unifortrade.api.user.dto.request.CreateUserRequest;
import com.unifortrade.api.user.dto.request.PatchUserRequest;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class UserControllerTest extends IntegrationTest {

    @Test
    void create_withValidData_returns201() throws Exception {
        TestIdentity identity = nextIdentity();

        mockMvc
            .perform(
                post("/api/users")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new CreateUserRequest(
                                identity.uniforId(),
                                "password123",
                                "New Signup",
                                null,
                                null,
                                identity.phoneNumber(),
                                identity.email()
                            )
                        )
                    )
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.uniforId").value(identity.uniforId()))
            .andExpect(jsonPath("$.profile.name").value("New Signup"));
    }

    @Test
    void create_withDuplicateUniforId_returns400() throws Exception {
        TestUser existing = registerAndLogin("password123", "Original");
        TestIdentity newIdentity = nextIdentity();

        mockMvc
            .perform(
                post("/api/users")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new CreateUserRequest(
                                existing.uniforId(),
                                "password123",
                                "Duplicate",
                                null,
                                null,
                                newIdentity.phoneNumber(),
                                newIdentity.email()
                            )
                        )
                    )
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void create_withInvalidUniforId_returns400() throws Exception {
        TestIdentity identity = nextIdentity();

        mockMvc
            .perform(
                post("/api/users")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new CreateUserRequest(
                                "not-six-digits",
                                "password123",
                                "Bad Id",
                                null,
                                null,
                                identity.phoneNumber(),
                                identity.email()
                            )
                        )
                    )
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void findById_returnsPublicProfile() throws Exception {
        TestUser user = registerAndLogin("password123", "Findable");

        mockMvc
            .perform(get("/api/users/{id}", user.id()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(user.id()))
            .andExpect(jsonPath("$.name").value("Findable"));
    }

    @Test
    void findById_unknownId_returns404() throws Exception {
        mockMvc
            .perform(get("/api/users/{id}", 999_999_999))
            .andExpect(status().isNotFound());
    }

    @Test
    void findByUniforId_returnsPublicProfile() throws Exception {
        TestUser user = registerAndLogin("password123", "Findable By UniforId");

        mockMvc
            .perform(get("/api/users/uniforId/{uniforId}", user.uniforId()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(user.id()));
    }

    @Test
    void patch_asAdmin_updatesAndReturns200() throws Exception {
        TestUser target = registerAndLogin("password123", "Moderated User");
        TestUser admin = registerAndLoginAdmin("password123", "Staff");

        mockMvc
            .perform(
                patch("/api/users/{id}", target.id())
                    .header(AUTH_HEADER, authHeader(admin))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new PatchUserRequest(
                                "Moderated By Staff",
                                null,
                                null,
                                null,
                                null
                            )
                        )
                    )
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.profile.name").value("Moderated By Staff"));
    }

    @Test
    void patch_asRegularUser_returns403() throws Exception {
        TestUser target = registerAndLogin("password123", "Target");
        TestUser other = registerAndLogin("password123", "Not Staff");

        mockMvc
            .perform(
                patch("/api/users/{id}", target.id())
                    .header(AUTH_HEADER, authHeader(other))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new PatchUserRequest("Hijacked", null, null, null, null)))
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void patch_withoutAuth_returns403() throws Exception {
        TestUser target = registerAndLogin("password123", "Target Without Auth");

        mockMvc
            .perform(
                patch("/api/users/{id}", target.id())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new PatchUserRequest("Hijacked", null, null, null, null)))
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void delete_asAdmin_returns204() throws Exception {
        TestUser target = registerAndLogin("password123", "To Delete");
        TestUser admin = registerAndLoginAdmin("password123", "Deleting Staff");

        mockMvc
            .perform(
                delete("/api/users/{id}", target.id())
                    .header(AUTH_HEADER, authHeader(admin))
            )
            .andExpect(status().isNoContent());

        mockMvc
            .perform(get("/api/users/{id}", target.id()))
            .andExpect(status().isNotFound());
    }

    @Test
    void delete_asRegularUser_returns403() throws Exception {
        TestUser target = registerAndLogin("password123", "Protected From Peers");
        TestUser other = registerAndLogin("password123", "Not Staff");

        mockMvc
            .perform(
                delete("/api/users/{id}", target.id())
                    .header(AUTH_HEADER, authHeader(other))
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void delete_withoutAuth_returns403() throws Exception {
        TestUser target = registerAndLogin("password123", "Protected Without Auth");

        mockMvc
            .perform(delete("/api/users/{id}", target.id()))
            .andExpect(status().isForbidden());
    }

    @Test
    void delete_withActiveListing_cascadesToHideListing() throws Exception {
        TestUser target = registerAndLogin("password123", "Owner With Listing");
        TestUser admin = registerAndLoginAdmin("password123", "Deleting Staff");
        ListingResponse listing = createListing(
            target,
            "A listing that outlives its owner's account",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                delete("/api/users/{id}", target.id())
                    .header(AUTH_HEADER, authHeader(admin))
            )
            .andExpect(status().isNoContent());

        mockMvc
            .perform(get("/api/listings/{id}", listing.id()))
            .andExpect(status().isNotFound());
    }
}
