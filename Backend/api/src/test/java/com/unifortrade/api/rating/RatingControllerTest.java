package com.unifortrade.api.rating;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.unifortrade.api.listing.dto.response.ListingResponse;
import com.unifortrade.api.rating.dto.request.CreateRatingRequest;
import com.unifortrade.api.support.IntegrationTest;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class RatingControllerTest extends IntegrationTest {

    private void completeATransactionBetween(TestUser seller, TestUser buyer)
        throws Exception {
        ListingResponse listing = createListing(
            seller,
            "Rating Fixture Listing " + seller.uniforId(),
            new BigDecimal("10.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(buyer))
            )
            .andExpect(status().isOk());

        mockMvc
            .perform(
                post("/api/listings/{id}/complete", listing.id())
                    .header(AUTH_HEADER, authHeader(seller))
            )
            .andExpect(status().isOk());
    }

    @Test
    void create_afterCompletedTransaction_returns201() throws Exception {
        TestUser seller = registerAndLogin("password123", "Rated Seller");
        TestUser buyer = registerAndLogin("password123", "Rating Buyer");
        completeATransactionBetween(seller, buyer);

        mockMvc
            .perform(
                post("/api/users/{userId}/ratings", seller.id())
                    .header(AUTH_HEADER, authHeader(buyer))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(new CreateRatingRequest(5, "Great trade, thanks!"))
                    )
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.score").value(5))
            .andExpect(jsonPath("$.ratedId").value(seller.id()))
            .andExpect(jsonPath("$.raterId").value(buyer.id()));
    }

    @Test
    void create_withoutCompletedTransaction_returns400() throws Exception {
        TestUser rater = registerAndLogin("password123", "No Transaction Rater");
        TestUser rated = registerAndLogin("password123", "No Transaction Rated");

        mockMvc
            .perform(
                post("/api/users/{userId}/ratings", rated.id())
                    .header(AUTH_HEADER, authHeader(rater))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateRatingRequest(4, "Never happened")))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void create_ratingYourself_returns400() throws Exception {
        TestUser user = registerAndLogin("password123", "Self Rater");

        mockMvc
            .perform(
                post("/api/users/{userId}/ratings", user.id())
                    .header(AUTH_HEADER, authHeader(user))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateRatingRequest(5, "I'm great")))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void create_ratingSameUserTwice_returns400() throws Exception {
        TestUser seller = registerAndLogin("password123", "Twice Rated Seller");
        TestUser buyer = registerAndLogin("password123", "Twice Rating Buyer");
        completeATransactionBetween(seller, buyer);

        mockMvc
            .perform(
                post("/api/users/{userId}/ratings", seller.id())
                    .header(AUTH_HEADER, authHeader(buyer))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateRatingRequest(5, "First rating")))
            )
            .andExpect(status().isCreated());

        mockMvc
            .perform(
                post("/api/users/{userId}/ratings", seller.id())
                    .header(AUTH_HEADER, authHeader(buyer))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateRatingRequest(1, "Second rating")))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void create_withoutAuth_returns403() throws Exception {
        TestUser rated = registerAndLogin("password123", "Unauthed Target");

        mockMvc
            .perform(
                post("/api/users/{userId}/ratings", rated.id())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateRatingRequest(5, "No auth")))
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void create_withOutOfRangeScore_returns400() throws Exception {
        TestUser seller = registerAndLogin("password123", "Invalid Score Seller");
        TestUser buyer = registerAndLogin("password123", "Invalid Score Buyer");
        completeATransactionBetween(seller, buyer);

        mockMvc
            .perform(
                post("/api/users/{userId}/ratings", seller.id())
                    .header(AUTH_HEADER, authHeader(buyer))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateRatingRequest(6, "Too high")))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    void findByUserId_returnsRatingsAndAverage() throws Exception {
        TestUser seller = registerAndLogin("password123", "Averaged Seller");
        TestUser buyer = registerAndLogin("password123", "Averaging Buyer");
        completeATransactionBetween(seller, buyer);

        mockMvc
            .perform(
                post("/api/users/{userId}/ratings", seller.id())
                    .header(AUTH_HEADER, authHeader(buyer))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateRatingRequest(4, "Solid")))
            )
            .andExpect(status().isCreated());

        mockMvc
            .perform(get("/api/users/{userId}/ratings", seller.id()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.count").value(1))
            .andExpect(jsonPath("$.average").value(4.0))
            .andExpect(jsonPath("$.ratings[0].score").value(4));
    }

    @Test
    void findByUserId_withNoRatings_returnsEmptyList() throws Exception {
        TestUser user = registerAndLogin("password123", "Unrated User");

        mockMvc
            .perform(get("/api/users/{userId}/ratings", user.id()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.count").value(0))
            .andExpect(jsonPath("$.ratings").isArray());
    }
}
