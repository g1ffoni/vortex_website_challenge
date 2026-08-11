package com.unifortrade.api.listing.service;

import com.unifortrade.api.auth.security.Permission;
import com.unifortrade.api.auth.security.RolePermissions;
import com.unifortrade.api.category.entity.Category;
import com.unifortrade.api.category.service.CategoryService;
import com.unifortrade.api.common.exceptionhandling.exception.BadRequestException;
import com.unifortrade.api.common.exceptionhandling.exception.ForbiddenException;
import com.unifortrade.api.common.exceptionhandling.exception.NotFoundException;
import com.unifortrade.api.listing.claim.entity.Claim;
import com.unifortrade.api.listing.claim.repository.ClaimRepository;
import com.unifortrade.api.listing.dto.request.CreateListingRequest;
import com.unifortrade.api.listing.dto.request.ListingSearchRequest;
import com.unifortrade.api.listing.dto.request.PatchListingRequest;
import com.unifortrade.api.listing.dto.response.ContactResponse;
import com.unifortrade.api.listing.dto.response.ListingResponse;
import com.unifortrade.api.listing.dto.response.ListingSummaryResponse;
import com.unifortrade.api.listing.entity.Listing;
import com.unifortrade.api.listing.entity.Listing.ListingStatus;
import com.unifortrade.api.listing.mapper.ListingMapper;
import com.unifortrade.api.listing.repository.ListingRepository;
import com.unifortrade.api.listing.specification.ListingSpecification;
import com.unifortrade.api.notification.entity.Notification;
import com.unifortrade.api.notification.service.NotificationService;
import com.unifortrade.api.user.entity.User;
import com.unifortrade.api.user.service.UserService;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ListingService {

    private final ListingRepository repository;
    private final ClaimRepository claimRepository;
    private final CategoryService categoryService;
    private final UserService userService;
    private final NotificationService notificationService;
    private final ListingMapper mapper;

    public Page<ListingSummaryResponse> search(
        ListingSearchRequest filters,
        Pageable pageable
    ) {
        Specification<Listing> spec = ListingSpecification.withFilters(filters);
        return repository.findAll(spec, pageable).map(mapper::toSummaryResponse);
    }

    public ListingResponse findById(Long listingId) {
        return mapper.toResponse(findEntityById(listingId));
    }

    @Transactional
    public ListingResponse create(CreateListingRequest request, Long requesterId) {
        User requester = userService.findEntityById(requesterId);

        Category category = categoryService.findEntityById(request.categoryId());

        Listing listing = Listing.builder()
            .title(request.title())
            .description(request.description())
            .price(request.price())
            .gallery(request.gallery())
            .status(ListingStatus.ACTIVE)
            .category(category)
            .owner(requester)
            .build();

        listing.resolveType();

        return mapper.toResponse(repository.save(listing));
    }

    @Transactional
    public ListingResponse patch(
        Long listingId,
        PatchListingRequest request,
        Long requesterId
    ) {
        Listing listing = findEntityById(listingId);
        User requester = userService.findEntityById(requesterId);

        assertOwnerOrPermitted(listing, requester, Permission.LISTING_UPDATE_ANY);

        if (request.title() != null && !request.title().isBlank()) {
            listing.setTitle(request.title());
        }

        if (request.description() != null && !request.description().isBlank()) {
            listing.setDescription(request.description());
        }

        if (request.price() != null) {
            listing.setPrice(request.price());
        }

        if (request.gallery() != null) {
            listing.setGallery(request.gallery());
        }

        if (request.categoryId() != null) {
            Category category = categoryService.findEntityById(request.categoryId());
            listing.setCategory(category);
        }

        listing.resolveType();

        return mapper.toResponse(repository.save(listing));
    }

    @Transactional
    public void delete(Long listingId, Long requesterId) {
        Listing listing = findEntityById(listingId);
        User requester = userService.findEntityById(requesterId);

        assertOwnerOrPermitted(listing, requester, Permission.LISTING_DELETE_ANY);

        if (listing.getStatus().equals(ListingStatus.CLAIMED)) {
            throw new BadRequestException(
                "Cancel the active claim before deleting this listing."
            );
        }

        listing.setDeleted(true);
        repository.save(listing);
    }

    @Transactional
    public ListingResponse claim(Long listingId, Long requesterId) {
        Listing listing = findEntityById(listingId);
        User requester = userService.findEntityById(requesterId);

        if (listing.getOwner().getId().equals(requester.getId())) {
            throw new BadRequestException("You can't claim your own listing.");
        }

        if (listing.getStatus() != ListingStatus.ACTIVE) {
            throw new BadRequestException(
                "This listing is no longer available."
            );
        }

        Claim claim = Claim.builder()
            .listing(listing)
            .claimer(requester)
            .status(Claim.ClaimStatus.ACTIVE)
            .build();

        claimRepository.save(claim);

        listing.setStatus(ListingStatus.CLAIMED);

        ListingResponse response = mapper.toResponse(repository.save(listing));

        notificationService.create(
            listing.getOwner(),
            requester.getProfile().getName() +
            " claimed your listing \"" +
            listing.getTitle() +
            "\".",
            Notification.LinkType.LISTING,
            listing.getId()
        );

        return response;
    }

    @Transactional
    public ListingResponse cancelClaim(Long listingId, Long requesterId) {
        Listing listing = findEntityById(listingId);
        User requester = userService.findEntityById(requesterId);

        assertOwnerOrClaimer(listing, requester);

        if (listing.getStatus() != ListingStatus.CLAIMED) {
            throw new BadRequestException(
                "This listing isn't currently claimed."
            );
        }

        Claim activeClaim = findActiveClaim(listingId);
        activeClaim.setStatus(Claim.ClaimStatus.CANCELLED);
        activeClaim.setResolvedAt(Instant.now());
        claimRepository.save(activeClaim);

        listing.setStatus(ListingStatus.ACTIVE);
        ListingResponse response = mapper.toResponse(repository.save(listing));

        User otherParty = requester.getId().equals(listing.getOwner().getId())
            ? activeClaim.getClaimer()
            : listing.getOwner();
        notificationService.create(
            otherParty,
            "The claim on \"" + listing.getTitle() + "\" was cancelled.",
            Notification.LinkType.LISTING,
            listing.getId()
        );

        return response;
    }

    public ContactResponse getListingThirdParty(Long listingId, Long requesterId) {
        Listing listing = findEntityById(listingId);
        User requester = userService.findEntityById(requesterId);

        assertOwnerOrClaimer(listing, requester);

        Claim activeClaim = findActiveClaim(listingId);
        boolean isSeller = listing.getOwner().getId().equals(requester.getId());
        boolean isClaimer = activeClaim
            .getClaimer()
            .getId()
            .equals(requester.getId());

        if (isSeller) {
            return mapper.toContactResponse(activeClaim.getClaimer());
        } else if (isClaimer) {
            return mapper.toContactResponse(listing.getOwner());
        } else {
            throw new BadRequestException(
                "You need to be either the listing's owner or its current claimer to get the third party's contact info."
            );
        }
    }

    @Transactional
    public ListingResponse complete(Long listingId, Long requesterId) {
        Listing listing = findEntityById(listingId);
        User requester = userService.findEntityById(requesterId);

        assertOwner(listing, requester);

        if (listing.getStatus() != ListingStatus.CLAIMED) {
            throw new BadRequestException(
                "This listing must be claimed before it can be marked as completed."
            );
        }

        Claim activeClaim = findActiveClaim(listingId);
        activeClaim.setStatus(Claim.ClaimStatus.COMPLETED);
        activeClaim.setResolvedAt(Instant.now());
        claimRepository.save(activeClaim);
        listing.setStatus(ListingStatus.COMPLETED);
        ListingResponse response = mapper.toResponse(repository.save(listing));

        notificationService.create(
            activeClaim.getClaimer(),
            "Your claim on \"" + listing.getTitle() + "\" was marked as completed.",
            Notification.LinkType.LISTING,
            listing.getId()
        );

        return response;
    }

    private Listing findEntityById(Long listingId) {
        Listing listing = repository
            .findById(listingId)
            .orElseThrow(() ->
                NotFoundException.of("Listing", listingId)
            );

        if (listing.isDeleted()) {
            throw NotFoundException.of("Listing", listingId);
        }

        return listing;
    }

    private Claim findActiveClaim(Long listingId) {
        return claimRepository
            .findByListingIdAndStatus(listingId, Claim.ClaimStatus.ACTIVE)
            .orElseThrow(() ->
                new BadRequestException("This listing has no active claim.")
            );
    }

    private void assertOwner(Listing listing, User user) {
        if (!listing.getOwner().getId().equals(user.getId())) {
            throw new ForbiddenException("You do not own this listing.");
        }
    }

    private void assertOwnerOrPermitted(
        Listing listing,
        User user,
        Permission overridePermission
    ) {
        boolean isOwner = listing.getOwner().getId().equals(user.getId());
        boolean isPermitted = RolePermissions.of(user.getRole())
            .contains(overridePermission);

        if (!isOwner && !isPermitted) {
            throw new ForbiddenException("You do not own this listing.");
        }
    }

    private void assertOwnerOrClaimer(Listing listing, User user) {
        Claim activeListingClaim = findActiveClaim(listing.getId());
        boolean isOwner = listing.getOwner().getId().equals(user.getId());
        boolean isClaimer = activeListingClaim
            .getClaimer()
            .getId()
            .equals(user.getId());

        if (!isOwner && !isClaimer) {
            throw new ForbiddenException(
                "Only the seller or the person who claimed this listing can do this."
            );
        }
    }
}

