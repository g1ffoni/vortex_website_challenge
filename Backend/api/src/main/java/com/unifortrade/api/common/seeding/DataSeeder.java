package com.unifortrade.api.common.seeding;

import com.unifortrade.api.auth.security.Role;
import com.unifortrade.api.category.dto.request.CreateCategoryRequest;
import com.unifortrade.api.category.dto.response.CategoryResponse;
import com.unifortrade.api.category.service.CategoryService;
import com.unifortrade.api.listing.dto.request.CreateListingRequest;
import com.unifortrade.api.listing.dto.response.ListingResponse;
import com.unifortrade.api.listing.service.ListingService;
import com.unifortrade.api.rating.service.RatingService;
import com.unifortrade.api.user.dto.request.CreateUserRequest;
import com.unifortrade.api.user.entity.User;
import com.unifortrade.api.user.repository.UserRepository;
import com.unifortrade.api.user.service.UserService;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryService categoryService;
    private final UserService userService;
    private final ListingService listingService;
    private final RatingService ratingService;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (!categoryService.findAllByOrderByNameAsc().isEmpty()) {
            return;
        }

        List<CategoryResponse> categories = List.of(
            categoryService.create(
                new CreateCategoryRequest("Books", "https://picsum.photos/1000")
            ),
            categoryService.create(
                new CreateCategoryRequest(
                    "Engineering",
                    "https://picsum.photos/1000"
                )
            ),
            categoryService.create(
                new CreateCategoryRequest(
                    "Computing",
                    "https://picsum.photos/1000"
                )
            ),
            categoryService.create(
                new CreateCategoryRequest(
                    "Electronics",
                    "https://picsum.photos/1000"
                )
            ),
            categoryService.create(
                new CreateCategoryRequest(
                    "Others",
                    "https://picsum.photos/1000"
                )
            )
        );

        Long books = categories.get(0).id();
        Long engineering = categories.get(1).id();
        Long computing = categories.get(2).id();
        Long electronics = categories.get(3).id();
        Long others = categories.get(4).id();

        Long avaId = getOrCreateUser(
            new CreateUserRequest(
                "202601",
                "demo_password_1",
                "Ava Martins",
                "Mechanical engineering student, always clearing out my dorm.",
                null,
                "+5585999990001",
                "ava.martins@unifortrade.local"
            ),
            Role.ROLE_USER
        );

        Long jordanId = getOrCreateUser(
            new CreateUserRequest(
                "202602",
                "demo_password_2",
                "Jordan Lee",
                "Computer science senior. Selling gear between semesters.",
                null,
                "+5585999990002",
                "jordan.lee@unifortrade.local"
            ),
            Role.ROLE_USER
        );

        getOrCreateUser(
            new CreateUserRequest(
                "202603",
                "admin",
                "Admin Demo",
                null,
                null,
                "+5585999990003",
                "admin@unifortrade.local"
            ),
            Role.ROLE_ADMIN
        );

        Long priyaId = getOrCreateUser(
            new CreateUserRequest(
                "202604",
                "demo_password_4",
                "Priya Shah",
                "Second-year student, always on the lookout for a good deal.",
                null,
                "+5585999990004",
                "priya.shah@unifortrade.local"
            ),
            Role.ROLE_USER
        );

        seedListing(
            avaId,
            books,
            "Calculus Volume 1 (Stewart)",
            "Used textbook, a few pencil notes inside. Great for anyone just starting out.",
            new BigDecimal("45.00"),
            "https://picsum.photos/seed/ava-calculus/600/400"
        );
        seedListing(
            avaId,
            engineering,
            "White Lab Coat, Size M",
            "Barely worn, only used for one semester. No stains.",
            BigDecimal.ZERO,
            "https://picsum.photos/seed/ava-labcoat/600/400"
        );
        Long avaCalculatorId = seedListing(
            avaId,
            computing,
            "Scientific Calculator HP 12c",
            "Works perfectly, new battery installed.",
            new BigDecimal("120.00"),
            "https://picsum.photos/seed/ava-calculator/600/400"
        );
        Long avaChargerId = seedListing(
            avaId,
            electronics,
            "USB-C Fast Charger, 65W",
            "Brand new, still in the box. Bought two by mistake.",
            new BigDecimal("35.00"),
            "https://picsum.photos/seed/ava-charger/600/400"
        );
        Long avaFridgeId = seedListing(
            avaId,
            others,
            "Mini Fridge for Dorm Room",
            "Compact fridge, perfect for a dorm room. Works great, minor scratches on the door.",
            new BigDecimal("80.00"),
            "https://picsum.photos/seed/ava-fridge/600/400"
        );

        seedListing(
            jordanId,
            books,
            "Introduction to Algorithms (CLRS)",
            "Hardcover copy, some highlighting in the first three chapters.",
            new BigDecimal("60.00"),
            "https://picsum.photos/seed/jordan-algorithms/600/400"
        );
        seedListing(
            jordanId,
            engineering,
            "Steel-Toe Safety Boots, Size 42",
            "Used for one lab rotation, still sturdy.",
            new BigDecimal("50.00"),
            "https://picsum.photos/seed/jordan-boots/600/400"
        );
        seedListing(
            jordanId,
            computing,
            "Mechanical Keyboard, Blue Switches",
            "RGB backlight, barely used, comes with the original box.",
            new BigDecimal("75.00"),
            "https://picsum.photos/seed/jordan-keyboard/600/400"
        );
        seedListing(
            jordanId,
            electronics,
            "Bluetooth Noise-Cancelling Headphones",
            "Great sound quality, includes the charging cable.",
            new BigDecimal("90.00"),
            "https://picsum.photos/seed/jordan-headphones/600/400"
        );
        Long jordanDeskId = seedListing(
            jordanId,
            others,
            "Folding Study Desk",
            "Giving this away, just needs a good wipe down.",
            BigDecimal.ZERO,
            "https://picsum.photos/seed/jordan-desk/600/400"
        );

        seedTransactionHistory(
            avaId,
            jordanId,
            priyaId,
            avaFridgeId,
            avaChargerId,
            avaCalculatorId,
            jordanDeskId
        );
    }

    /**
     * Instead of inserting claims, ratings and notifications directly, this
     * drives them through the same service calls the API exposes, so the
     * seeded data looks like the result of real trades that already
     * happened (some finished, some fell through, one still in progress).
     */
    private void seedTransactionHistory(
        Long avaId,
        Long jordanId,
        Long priyaId,
        Long avaFridgeId,
        Long avaChargerId,
        Long avaCalculatorId,
        Long jordanDeskId
    ) {
        // Completed trade with mutual ratings: Jordan claims Ava's fridge,
        // Ava marks it completed, both sides leave a rating afterwards.
        listingService.claim(avaFridgeId, jordanId);
        listingService.complete(avaFridgeId, avaId);
        ratingService.create(
            userService.findEntityById(avaId),
            jordanId,
            5,
            "Smooth pickup, exactly as described. Would trade again!"
        );
        ratingService.create(
            userService.findEntityById(jordanId),
            avaId,
            5,
            "Great seller, very responsive and the fridge works perfectly."
        );

        // Completed trade with only a one-sided rating: Priya claims
        // Jordan's free desk, he marks it completed, but only Priya rates.
        listingService.claim(jordanDeskId, priyaId);
        listingService.complete(jordanDeskId, jordanId);
        ratingService.create(
            userService.findEntityById(priyaId),
            jordanId,
            4,
            "Desk was a bit dusty but otherwise great, thanks for giving it away!"
        );

        // Claim that fell through: Jordan claims Ava's charger, then backs
        // out, so the listing returns to ACTIVE with a claim history.
        listingService.claim(avaChargerId, jordanId);
        listingService.cancelClaim(avaChargerId, jordanId);

        // Trade still in progress: Priya has claimed Ava's calculator, but
        // it hasn't been completed yet.
        listingService.claim(avaCalculatorId, priyaId);
    }

    private Long getOrCreateUser(CreateUserRequest request, Role role) {
        User user = userRepository
            .findByUniforId(request.uniforId())
            .orElseGet(() -> {
                userService.create(request);
                return userRepository
                    .findByUniforId(request.uniforId())
                    .orElseThrow();
            });

        if (user.getRole() != role) {
            user.setRole(role);
            userRepository.save(user);
        }

        return user.getId();
    }

    private Long seedListing(
        Long ownerId,
        Long categoryId,
        String title,
        String description,
        BigDecimal price,
        String imageUrl
    ) {
        ListingResponse response = listingService.create(
            new CreateListingRequest(
                title,
                description,
                price,
                List.of(imageUrl),
                categoryId
            ),
            ownerId
        );

        return response.id();
    }
}
