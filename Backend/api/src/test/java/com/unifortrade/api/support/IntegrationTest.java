package com.unifortrade.api.support;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import jakarta.persistence.EntityManager;
import tools.jackson.databind.ObjectMapper;
import com.unifortrade.api.auth.dto.request.LoginRequest;
import com.unifortrade.api.auth.dto.response.AuthResponse;
import com.unifortrade.api.auth.security.Role;
import com.unifortrade.api.category.dto.response.CategoryResponse;
import com.unifortrade.api.listing.dto.request.CreateListingRequest;
import com.unifortrade.api.listing.dto.response.ListingResponse;
import com.unifortrade.api.user.dto.request.CreateUserRequest;
import com.unifortrade.api.user.dto.response.CurrentUserResponse;
import com.unifortrade.api.user.entity.User;
import com.unifortrade.api.user.repository.UserRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public abstract class IntegrationTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected EntityManager entityManager;

    private static final AtomicInteger COUNTER = new AtomicInteger(300_000);

    protected record TestIdentity(
        String uniforId,
        String email,
        String phoneNumber
    ) {}

    protected record TestUser(
        Long id,
        String uniforId,
        String password,
        String accessToken,
        String refreshToken
    ) {
        String bearer() {
            return "Bearer " + accessToken;
        }
    }

    protected static TestIdentity nextIdentity() {
        int n = COUNTER.getAndIncrement();
        return new TestIdentity(
            String.valueOf(n),
            "test" + n + "@example.com",
            "+5585" + String.format("%06d", n % 1_000_000)
        );
    }

    protected String toJson(Object body) throws Exception {
        return objectMapper.writeValueAsString(body);
    }

    protected <T> T fromJson(String json, Class<T> type) throws Exception {
        return objectMapper.readValue(json, type);
    }

    protected TestUser registerAndLogin(String password, String name)
        throws Exception {
        TestIdentity identity = nextIdentity();

        String createBody = toJson(
            new CreateUserRequest(
                identity.uniforId(),
                password,
                name,
                null,
                null,
                identity.phoneNumber(),
                identity.email()
            )
        );

        String createResponse = mockMvc
            .perform(
                post("/api/users")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(createBody)
            )
            .andExpect(status().isCreated())
            .andReturn()
            .getResponse()
            .getContentAsString();

        Long userId = fromJson(createResponse, CurrentUserResponse.class)
            .profile()
            .id();

        AuthResponse auth = login(identity.uniforId(), password);

        return new TestUser(
            userId,
            identity.uniforId(),
            password,
            auth.accessToken(),
            auth.refreshToken()
        );
    }

    protected TestUser registerAndLoginAdmin(String password, String name)
        throws Exception {
        TestUser user = registerAndLogin(password, name);
        User entity = userRepository.findById(user.id()).orElseThrow();
        entity.setRole(Role.ROLE_ADMIN);
        userRepository.save(entity);

        return user;
    }

    protected AuthResponse login(String uniforId, String password)
        throws Exception {
        String body = toJson(new LoginRequest(uniforId, password));
        String response = mockMvc
            .perform(
                post("/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(body)
            )
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();
        return fromJson(response, AuthResponse.class);
    }

    protected String authHeader(TestUser user) {
        return user.bearer();
    }

    protected Long firstCategoryId() throws Exception {
        String response = mockMvc
            .perform(get("/api/categories"))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();
        List<CategoryResponse> categories = objectMapper.readValue(
            response,
            objectMapper
                .getTypeFactory()
                .constructCollectionType(List.class, CategoryResponse.class)
        );
        return categories.get(0).id();
    }

    protected ListingResponse createListing(
        TestUser owner,
        String title,
        BigDecimal price
    ) throws Exception {
        return createListing(owner, title, price, firstCategoryId());
    }

    protected ListingResponse createListing(
        TestUser owner,
        String title,
        BigDecimal price,
        Long categoryId
    ) throws Exception {
        String body = toJson(
            new CreateListingRequest(
                title,
                "A perfectly valid, sufficiently long description.",
                price,
                List.of("https://picsum.photos/seed/" + title.hashCode() + "/200"),
                categoryId
            )
        );

        String response = mockMvc
            .perform(
                post("/api/listings")
                    .header(AUTH_HEADER, authHeader(owner))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(body)
            )
            .andExpect(status().isCreated())
            .andReturn()
            .getResponse()
            .getContentAsString();

        return fromJson(response, ListingResponse.class);
    }

    protected static final String AUTH_HEADER = HttpHeaders.AUTHORIZATION;
}
