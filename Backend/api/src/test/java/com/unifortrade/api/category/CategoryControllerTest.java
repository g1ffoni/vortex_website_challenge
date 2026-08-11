package com.unifortrade.api.category;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.unifortrade.api.category.dto.request.CreateCategoryRequest;
import com.unifortrade.api.common.util.SlugUtil;
import com.unifortrade.api.support.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class CategoryControllerTest extends IntegrationTest {

    private String uniqueName() {
        return "Test Category " + nextIdentity().uniforId();
    }

    private String uniqueImageUrl() {
        return "https://picsum.photos/seed/" + nextIdentity().uniforId() + "/600/400";
    }

    @Test
    void findAll_isPubliclyAccessible() throws Exception {
        mockMvc
            .perform(get("/api/categories"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray());
    }

    @Test
    void findById_returnsCategory() throws Exception {
        mockMvc
            .perform(get("/api/categories/{id}", firstCategoryId()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(firstCategoryId()));
    }

    @Test
    void findById_unknownId_returns404() throws Exception {
        mockMvc
            .perform(get("/api/categories/{id}", 999_999_999))
            .andExpect(status().isNotFound());
    }

    @Test
    void create_asAdmin_returns201() throws Exception {
        TestUser admin = registerAndLoginAdmin("password123", "Category Admin");
        String name = uniqueName();
        String imageUrl = uniqueImageUrl();

        mockMvc
            .perform(
                post("/api/categories")
                    .header(AUTH_HEADER, authHeader(admin))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateCategoryRequest(name, imageUrl)))
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.slug").value(SlugUtil.slugify(name)))
            .andExpect(jsonPath("$.imageUrl").value(imageUrl));
    }

    @Test
    void create_asRegularUser_returns403() throws Exception {
        TestUser user = registerAndLogin("password123", "Regular User");

        mockMvc
            .perform(
                post("/api/categories")
                    .header(AUTH_HEADER, authHeader(user))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(new CreateCategoryRequest(uniqueName(), uniqueImageUrl()))
                    )
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void create_withoutAuth_returns403() throws Exception {
        mockMvc
            .perform(
                post("/api/categories")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(new CreateCategoryRequest(uniqueName(), uniqueImageUrl()))
                    )
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void create_withDuplicateName_getsDistinctDisambiguatedSlug() throws Exception {
        TestUser admin = registerAndLoginAdmin("password123", "Duplicate Name Admin");
        String name = uniqueName();
        String expectedBaseSlug = SlugUtil.slugify(name);

        mockMvc
            .perform(
                post("/api/categories")
                    .header(AUTH_HEADER, authHeader(admin))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateCategoryRequest(name, uniqueImageUrl())))
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.slug").value(expectedBaseSlug));

        mockMvc
            .perform(
                post("/api/categories")
                    .header(AUTH_HEADER, authHeader(admin))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateCategoryRequest(name, uniqueImageUrl())))
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.slug").value(expectedBaseSlug + "-2"));
    }

    @Test
    void delete_asAdmin_returns204() throws Exception {
        TestUser admin = registerAndLoginAdmin("password123", "Deleting Admin");
        String createResponse = mockMvc
            .perform(
                post("/api/categories")
                    .header(AUTH_HEADER, authHeader(admin))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        toJson(
                            new CreateCategoryRequest("To Delete", uniqueImageUrl())
                        )
                    )
            )
            .andExpect(status().isCreated())
            .andReturn()
            .getResponse()
            .getContentAsString();
        Long categoryId = fromJson(
            createResponse,
            com.unifortrade.api.category.dto.response.CategoryResponse.class
        ).id();

        mockMvc
            .perform(
                delete("/api/categories/{id}", categoryId)
                    .header(AUTH_HEADER, authHeader(admin))
            )
            .andExpect(status().isNoContent());

        mockMvc
            .perform(get("/api/categories/{id}", categoryId))
            .andExpect(status().isNotFound());
    }

    @Test
    void create_withNameOfDeletedCategory_getsDisambiguatedSlug() throws Exception {
        TestUser admin = registerAndLoginAdmin("password123", "Reclaiming Slug Admin");
        String name = uniqueName();
        String expectedBaseSlug = SlugUtil.slugify(name);

        String createResponse = mockMvc
            .perform(
                post("/api/categories")
                    .header(AUTH_HEADER, authHeader(admin))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateCategoryRequest(name, uniqueImageUrl())))
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.slug").value(expectedBaseSlug))
            .andReturn()
            .getResponse()
            .getContentAsString();
        Long categoryId = fromJson(
            createResponse,
            com.unifortrade.api.category.dto.response.CategoryResponse.class
        ).id();

        mockMvc
            .perform(
                delete("/api/categories/{id}", categoryId)
                    .header(AUTH_HEADER, authHeader(admin))
            )
            .andExpect(status().isNoContent());

        mockMvc
            .perform(
                post("/api/categories")
                    .header(AUTH_HEADER, authHeader(admin))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(toJson(new CreateCategoryRequest(name, uniqueImageUrl())))
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.slug").value(expectedBaseSlug + "-2"));
    }

    @Test
    void delete_asRegularUser_returns403() throws Exception {
        TestUser user = registerAndLogin("password123", "Cannot Delete");

        mockMvc
            .perform(
                delete("/api/categories/{id}", firstCategoryId())
                    .header(AUTH_HEADER, authHeader(user))
            )
            .andExpect(status().isForbidden());
    }
}
