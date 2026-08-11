package com.unifortrade.api.stats;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.unifortrade.api.support.IntegrationTest;
import org.junit.jupiter.api.Test;

class StatsControllerTest extends IntegrationTest {

    @Test
    void getStats_isPubliclyAccessible() throws Exception {
        mockMvc
            .perform(get("/api/stats"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.registeredUsersCount").isNumber())
            .andExpect(jsonPath("$.completedClaimsCount").isNumber())
            .andExpect(jsonPath("$.completedSaleClaimsCount").isNumber())
            .andExpect(jsonPath("$.completedDonationClaimsCount").isNumber());
    }

    @Test
    void getStats_reflectsNewUserRegistration() throws Exception {
        long before = fromJson(
            mockMvc
                .perform(get("/api/stats"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            com.unifortrade.api.stats.dto.response.StatsResponse.class
        ).registeredUsersCount();

        registerAndLogin("password123", "Stats Bump User");

        long after = fromJson(
            mockMvc
                .perform(get("/api/stats"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            com.unifortrade.api.stats.dto.response.StatsResponse.class
        ).registeredUsersCount();

        org.assertj.core.api.Assertions.assertThat(after).isEqualTo(before + 1);
    }
}
