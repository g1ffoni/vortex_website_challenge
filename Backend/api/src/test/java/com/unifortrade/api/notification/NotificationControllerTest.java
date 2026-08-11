package com.unifortrade.api.notification;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.unifortrade.api.listing.dto.response.ListingResponse;
import com.unifortrade.api.notification.dto.response.NotificationResponse;
import com.unifortrade.api.notification.entity.Notification.LinkType;
import com.unifortrade.api.rating.dto.request.CreateRatingRequest;
import com.unifortrade.api.support.IntegrationTest;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class NotificationControllerTest extends IntegrationTest {

    private List<NotificationResponse> findOwnNotifications(TestUser user)
        throws Exception {
        String response = mockMvc
            .perform(
                get("/api/users/me/notifications").header(AUTH_HEADER, authHeader(user))
            )
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();
        return objectMapper.readValue(
            response,
            objectMapper
                .getTypeFactory()
                .constructCollectionType(List.class, NotificationResponse.class)
        );
    }

    @Test
    void findAll_withoutAuth_returns403() throws Exception {
        mockMvc
            .perform(get("/api/users/me/notifications"))
            .andExpect(status().isForbidden());
    }

    @Test
    void dismiss_withoutAuth_returns403() throws Exception {
        mockMvc
            .perform(post("/api/users/me/notifications/{id}/dismiss", 1))
            .andExpect(status().isForbidden());
    }

    @Test
    void claim_notifiesListingOwner() throws Exception {
        TestUser seller = registerAndLogin("password123", "Notified Seller");
        TestUser buyer = registerAndLogin("password123", "Claiming Buyer");
        ListingResponse listing = createListing(
            seller,
            "Listing That Gets Claimed",
            new BigDecimal("15.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(buyer))
            )
            .andExpect(status().isOk());

        List<NotificationResponse> notifications = findOwnNotifications(seller);
        NotificationResponse notification = notifications
            .stream()
            .filter(n -> n.message().contains(listing.title()))
            .findFirst()
            .orElseThrow();

        assertThat(notification.message())
            .isEqualTo(
                "Claiming Buyer claimed your listing \"" + listing.title() + "\"."
            );
        assertThat(notification.dismissed()).isFalse();
        assertThat(notification.linkType()).isEqualTo(LinkType.LISTING);
        assertThat(notification.linkId()).isEqualTo(listing.id());
    }

    @Test
    void complete_notifiesClaimer() throws Exception {
        TestUser seller = registerAndLogin("password123", "Completing Seller");
        TestUser buyer = registerAndLogin("password123", "Completed Buyer");
        ListingResponse listing = createListing(
            seller,
            "Listing That Gets Completed",
            new BigDecimal("20.00")
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

        NotificationResponse notification = findOwnNotifications(buyer)
            .stream()
            .filter(n -> n.linkType() == LinkType.LISTING)
            .findFirst()
            .orElseThrow();

        assertThat(notification.message())
            .isEqualTo(
                "Your claim on \"" + listing.title() + "\" was marked as completed."
            );
        assertThat(notification.linkId()).isEqualTo(listing.id());
    }

    @Test
    void cancelClaim_notifiesOtherParty() throws Exception {
        TestUser seller = registerAndLogin("password123", "Cancelling Seller");
        TestUser buyer = registerAndLogin("password123", "Cancelled Buyer");
        ListingResponse listing = createListing(
            seller,
            "Listing That Gets Cancelled",
            new BigDecimal("25.00")
        );

        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(buyer))
            )
            .andExpect(status().isOk());

        mockMvc
            .perform(
                delete("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(buyer))
            )
            .andExpect(status().isOk());

        NotificationResponse notification = findOwnNotifications(seller)
            .stream()
            .filter(n -> n.message().contains("cancelled"))
            .findFirst()
            .orElseThrow();

        assertThat(notification.message())
            .isEqualTo("The claim on \"" + listing.title() + "\" was cancelled.");
        assertThat(notification.linkType()).isEqualTo(LinkType.LISTING);
        assertThat(notification.linkId()).isEqualTo(listing.id());
    }

    @Test
    void rating_notifiesRatedUser() throws Exception {
        TestUser seller = registerAndLogin("password123", "Rated Notified Seller");
        TestUser buyer = registerAndLogin("password123", "Rating Notified Buyer");
        ListingResponse listing = createListing(
            seller,
            "Listing Behind A Rating",
            new BigDecimal("30.00")
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

        mockMvc
            .perform(
                post("/api/users/{userId}/ratings", seller.id())
                    .header(AUTH_HEADER, authHeader(buyer))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateRatingRequest(5, "Smooth trade!")))
            )
            .andExpect(status().isCreated());

        NotificationResponse notification = findOwnNotifications(seller)
            .stream()
            .filter(n -> n.linkType() == LinkType.USER)
            .findFirst()
            .orElseThrow();

        assertThat(notification.message())
            .isEqualTo("Rating Notified Buyer left you a 5-star rating.");
        assertThat(notification.linkId()).isEqualTo(buyer.id());
    }

    @Test
    void dismiss_asOwner_marksDismissedAndIsIdempotent() throws Exception {
        TestUser seller = registerAndLogin("password123", "Dismissing Seller");
        TestUser buyer = registerAndLogin("password123", "Dismissing Buyer");
        ListingResponse listing = createListing(
            seller,
            "Listing Behind A Dismissable Notification",
            new BigDecimal("12.00")
        );
        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(buyer))
            )
            .andExpect(status().isOk());

        Long notificationId = findOwnNotifications(seller).get(0).id();

        mockMvc
            .perform(
                post(
                    "/api/users/me/notifications/{id}/dismiss",
                    notificationId
                )
                    .header(AUTH_HEADER, authHeader(seller))
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.dismissed").value(true));

        mockMvc
            .perform(
                post(
                    "/api/users/me/notifications/{id}/dismiss",
                    notificationId
                )
                    .header(AUTH_HEADER, authHeader(seller))
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.dismissed").value(true));
    }

    @Test
    void dismiss_notOwnedByCaller_returns403() throws Exception {
        TestUser seller = registerAndLogin("password123", "Protected Seller");
        TestUser buyer = registerAndLogin("password123", "Protected Buyer");
        TestUser stranger = registerAndLogin("password123", "Notification Stranger");
        ListingResponse listing = createListing(
            seller,
            "Listing Behind A Protected Notification",
            new BigDecimal("18.00")
        );
        mockMvc
            .perform(
                post("/api/listings/{id}/claim", listing.id())
                    .header(AUTH_HEADER, authHeader(buyer))
            )
            .andExpect(status().isOk());

        Long notificationId = findOwnNotifications(seller).get(0).id();

        mockMvc
            .perform(
                post(
                    "/api/users/me/notifications/{id}/dismiss",
                    notificationId
                )
                    .header(AUTH_HEADER, authHeader(stranger))
            )
            .andExpect(status().isForbidden());
    }
}
