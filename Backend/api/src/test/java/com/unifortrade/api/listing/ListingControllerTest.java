package com.unifortrade.api.listing;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.unifortrade.api.listing.dto.request.CreateListingRequest;
import com.unifortrade.api.listing.dto.request.PatchListingRequest;
import com.unifortrade.api.listing.dto.response.ListingResponse;
import com.unifortrade.api.support.IntegrationTest;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class ListingControllerTest extends IntegrationTest {

    @Test
    void create_asAuthenticatedUser_returns201() throws Exception {
        TestUser seller = registerAndLogin("password123", "Seller");

        ListingResponse response = createListing(
            seller,
            "Integration Test Textbook",
            new BigDecimal("30.00")
        );

        org.assertj.core.api.Assertions.assertThat(response.title())
            .isEqualTo("Integration Test Textbook");
        org.assertj.core.api.Assertions.assertThat(response.type().name())
            .isEqualTo("SALE");
    }

    @Test
    void create_withZeroPrice_resolvesAsDonation() throws Exception {
        TestUser seller = registerAndLogin("password123", "Donor");

        ListingResponse response = createListing(
            seller,
            "Free Donation Item",
            BigDecimal.ZERO
        );

        org.assertj.core.api.Assertions.assertThat(response.type().name())
            .isEqualTo("DONATION");
    }

    @Test
    void create_withoutAuth_returns403() throws Exception {
        Long categoryId = firstCategoryId();

        mockMvc
            .perform(
                post("/api/listings")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new CreateListingRequest(
                                "No Auth Listing",
                                "A perfectly valid description here.",
                                new BigDecimal("10.00"),
                                List.of("https://picsum.photos/seed/x/200"),
                                categoryId
                            )
                        )
                    )
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void create_withTooShortDescription_returns400() throws Exception {
        TestUser seller = registerAndLogin("password123", "Bad Description Seller");
        Long categoryId = firstCategoryId();

        mockMvc
            .perform(
                post("/api/listings")
                    .header(AUTH_HEADER, authHeader(seller))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new CreateListingRequest(
                                "Title",
                                "short",
                                new BigDecimal("10.00"),
                                List.of("https://picsum.photos/seed/x/200"),
                                categoryId
                            )
                        )
                    )
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void findById_returnsListing() throws Exception {
        TestUser seller = registerAndLogin("password123", "Findable Seller");
        ListingResponse listing = createListing(
            seller,
            "Findable Listing",
            new BigDecimal("15.00")
        );

        mockMvc
            .perform(get("/api/listings/{id}", listing.id()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Findable Listing"))
            .andExpect(jsonPath("$.gallery").isArray());
    }

    @Test
    void search_withNoFilters_returns200() throws Exception {
        mockMvc
            .perform(get("/api/listings"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content").isArray());
    }

    @Test
    void search_withNonPositiveCategoryId_returns400() throws Exception {
        mockMvc
            .perform(get("/api/listings").param("categoryId", "0"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.details").isArray());
    }

    @Test
    void search_withNegativeMinPrice_returns400() throws Exception {
        mockMvc
            .perform(get("/api/listings").param("minPrice", "-1"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void search_withTooManyPriceDecimals_returns400() throws Exception {
        mockMvc
            .perform(get("/api/listings").param("maxPrice", "1.234"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void search_byKeyword_findsMatchingListing() throws Exception {
        TestUser seller = registerAndLogin("password123", "Keyword Seller");
        createListing(
            seller,
            "VeryUniqueKeywordZyx123",
            new BigDecimal("20.00")
        );

        mockMvc
            .perform(get("/api/listings").param("keyword", "VeryUniqueKeywordZyx123"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content[0].title").value("VeryUniqueKeywordZyx123"))
            .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    void patch_asOwner_updatesAndReturns200() throws Exception {
        TestUser seller = registerAndLogin("password123", "Patch Owner");
        ListingResponse listing = createListing(
            seller,
            "Original Title",
            new BigDecimal("25.00")
        );

        mockMvc
            .perform(
                patch("/api/listings/{id}", listing.id())
                    .header(AUTH_HEADER, authHeader(seller))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new PatchListingRequest(
                                "Patched Title",
                                null,
                                null,
                                null,
                                null
                            )
                        )
                    )
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Patched Title"));
    }

    @Test
    void patch_asDifferentUser_returns403() throws Exception {
        TestUser seller = registerAndLogin("password123", "Real Owner");
        TestUser stranger = registerAndLogin("password123", "Stranger");
        ListingResponse listing = createListing(
            seller,
            "Not Yours",
            new BigDecimal("25.00")
        );

        mockMvc
            .perform(
                patch("/api/listings/{id}", listing.id())
                    .header(AUTH_HEADER, authHeader(stranger))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new PatchListingRequest(
                                "Hijacked Title",
                                null,
                                null,
                                null,
                                null
                            )
                        )
                    )
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void patch_asAdmin_overridesOwnershipAndReturns200() throws Exception {
        TestUser seller = registerAndLogin("password123", "Moderated Owner");
        TestUser admin = registerAndLoginAdmin("password123", "Moderator");
        ListingResponse listing = createListing(
            seller,
            "Needs Moderation",
            new BigDecimal("25.00")
        );

        mockMvc
            .perform(
                patch("/api/listings/{id}", listing.id())
                    .header(AUTH_HEADER, authHeader(admin))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new PatchListingRequest(
                                "Moderated Title",
                                null,
                                null,
                                null,
                                null
                            )
                        )
                    )
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Moderated Title"));
    }

    @Test
    void delete_asOwner_returns204() throws Exception {
        TestUser seller = registerAndLogin("password123", "Delete Owner");
        ListingResponse listing = createListing(
            seller,
            "To Be Deleted",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                delete("/api/listings/{id}", listing.id())
                    .header(AUTH_HEADER, authHeader(seller))
            )
            .andExpect(status().isNoContent());

        mockMvc
            .perform(get("/api/listings/{id}", listing.id()))
            .andExpect(status().isNotFound());
    }

    @Test
    void delete_asDifferentUser_returns403() throws Exception {
        TestUser seller = registerAndLogin("password123", "Protected Owner");
        TestUser stranger = registerAndLogin("password123", "Would-be Deleter");
        ListingResponse listing = createListing(
            seller,
            "Protected Listing",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                delete("/api/listings/{id}", listing.id())
                    .header(AUTH_HEADER, authHeader(stranger))
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void delete_asAdmin_overridesOwnershipAndReturns204() throws Exception {
        TestUser seller = registerAndLogin("password123", "Removable Owner");
        TestUser admin = registerAndLoginAdmin("password123", "Remover");
        ListingResponse listing = createListing(
            seller,
            "Removable Listing",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                delete("/api/listings/{id}", listing.id())
                    .header(AUTH_HEADER, authHeader(admin))
            )
            .andExpect(status().isNoContent());
    }

    @Test
    void claim_byDifferentUser_marksListingClaimed() throws Exception {
        TestUser seller = registerAndLogin("password123", "Claim Seller");
        TestUser claimer = registerAndLogin("password123", "Claimer");
        ListingResponse listing = createListing(
            seller,
            "Claimable Listing",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(claimer))
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("CLAIMED"));
    }

    @Test
    void claim_ownListing_returns400() throws Exception {
        TestUser seller = registerAndLogin("password123", "Self Claim Seller");
        ListingResponse listing = createListing(
            seller,
            "Cannot Self Claim",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(seller))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void cancelClaim_byClaimer_returnsListingToActive() throws Exception {
        TestUser seller = registerAndLogin("password123", "Cancel Seller");
        TestUser claimer = registerAndLogin("password123", "Cancel Claimer");
        ListingResponse listing = createListing(
            seller,
            "Cancel Claim Listing",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(claimer))
            )
            .andExpect(status().isOk());

        mockMvc
            .perform(
                delete("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(claimer))
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test
    void delete_whileClaimed_returns400() throws Exception {
        TestUser seller = registerAndLogin("password123", "Claimed Delete Seller");
        TestUser claimer = registerAndLogin("password123", "Claimed Delete Claimer");
        ListingResponse listing = createListing(
            seller,
            "Claimed Cannot Delete",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(claimer))
            )
            .andExpect(status().isOk());

        mockMvc
            .perform(
                delete("/api/listings/{id}", listing.id())
                    .header(AUTH_HEADER, authHeader(seller))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void complete_byOwnerAfterClaim_marksCompleted() throws Exception {
        TestUser seller = registerAndLogin("password123", "Complete Seller");
        TestUser claimer = registerAndLogin("password123", "Complete Claimer");
        ListingResponse listing = createListing(
            seller,
            "Complete Listing",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(claimer))
            )
            .andExpect(status().isOk());

        mockMvc
            .perform(
                post("/api/listings/{id}/complete", listing.id())
                    .header(AUTH_HEADER, authHeader(seller))
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("COMPLETED"));
    }

    @Test
    void complete_beforeClaim_returns400() throws Exception {
        TestUser seller = registerAndLogin("password123", "Premature Complete Seller");
        ListingResponse listing = createListing(
            seller,
            "Not Yet Claimed",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/complete", listing.id())
                    .header(AUTH_HEADER, authHeader(seller))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void getContact_asSeller_returnsClaimersContact() throws Exception {
        TestUser seller = registerAndLogin("password123", "Contact Seller");
        TestUser claimer = registerAndLogin("password123", "Contact Claimer");
        ListingResponse listing = createListing(
            seller,
            "Contact Listing",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(claimer))
            )
            .andExpect(status().isOk());

        mockMvc
            .perform(
                get("/api/listings/{id}/contact", listing.id())
                    .header(AUTH_HEADER, authHeader(seller))
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.userId").value(claimer.id()));
    }

    @Test
    void getContact_asUninvolvedUser_returns403() throws Exception {
        TestUser seller = registerAndLogin("password123", "Uninvolved Seller");
        TestUser claimer = registerAndLogin("password123", "Uninvolved Claimer");
        TestUser outsider = registerAndLogin("password123", "Outsider");
        ListingResponse listing = createListing(
            seller,
            "Uninvolved Listing",
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(claimer))
            )
            .andExpect(status().isOk());

        mockMvc
            .perform(
                get("/api/listings/{id}/contact", listing.id())
                    .header(AUTH_HEADER, authHeader(outsider))
            )
            .andExpect(status().isForbidden());
    }
}
