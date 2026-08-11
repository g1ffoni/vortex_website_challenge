package com.unifortrade.api.listing.controller;

import com.unifortrade.api.auth.security.CustomUserDetails;
import com.unifortrade.api.common.dto.response.PageResponse;
import com.unifortrade.api.listing.dto.request.CreateListingRequest;
import com.unifortrade.api.listing.dto.request.ListingSearchRequest;
import com.unifortrade.api.listing.dto.request.PatchListingRequest;
import com.unifortrade.api.listing.dto.response.ContactResponse;
import com.unifortrade.api.listing.dto.response.ListingResponse;
import com.unifortrade.api.listing.dto.response.ListingSummaryResponse;
import com.unifortrade.api.listing.service.ListingService;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService service;

    @GetMapping
    public ResponseEntity<PageResponse<ListingSummaryResponse>> search(
        @Valid ListingSearchRequest filters,
        @PageableDefault(size = 20) Pageable pageable
    ) {
        return ResponseEntity.ok(
            PageResponse.from(service.search(filters, pageable))
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('listing:create')")
    public ResponseEntity<ListingResponse> create(
        @AuthenticationPrincipal CustomUserDetails principal,
        @Valid @RequestBody CreateListingRequest request
    ) {
        ListingResponse response = service.create(request, principal.getId());
        URI location = URI.create("/api/listings/" + response.id());
        return ResponseEntity.created(location).body(response);
    }

    @PatchMapping("/{id}")
    @PreAuthorize(
        "hasAuthority('listing:update:own') or hasAuthority('listing:update:any')"
    )
    public ResponseEntity<ListingResponse> patch(
        @AuthenticationPrincipal CustomUserDetails principal,
        @PathVariable Long id,
        @Valid @RequestBody PatchListingRequest request
    ) {
        return ResponseEntity.ok(
            service.patch(id, request, principal.getId())
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize(
        "hasAuthority('listing:delete:own') or hasAuthority('listing:delete:any')"
    )
    public ResponseEntity<Void> delete(
        @AuthenticationPrincipal CustomUserDetails principal,
        @PathVariable Long id
    ) {
        service.delete(id, principal.getId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/claim")
    @PreAuthorize("hasAuthority('listing:claim')")
    public ResponseEntity<ListingResponse> claim(
        @AuthenticationPrincipal CustomUserDetails principal,
        @PathVariable Long id
    ) {
        return ResponseEntity.ok(service.claim(id, principal.getId()));
    }

    @DeleteMapping("/{id}/claim")
    @PreAuthorize("hasAuthority('listing:claim')")
    public ResponseEntity<ListingResponse> cancelClaim(
        @AuthenticationPrincipal CustomUserDetails principal,
        @PathVariable Long id
    ) {
        return ResponseEntity.ok(service.cancelClaim(id, principal.getId()));
    }

    @PostMapping("/{id}/complete")
    @PreAuthorize("hasAuthority('listing:complete')")
    public ResponseEntity<ListingResponse> complete(
        @AuthenticationPrincipal CustomUserDetails principal,
        @PathVariable Long id
    ) {
        return ResponseEntity.ok(service.complete(id, principal.getId()));
    }

    @GetMapping("/{id}/contact")
    @PreAuthorize("hasAuthority('listing:contact')")
    public ResponseEntity<ContactResponse> getContact(
        @AuthenticationPrincipal CustomUserDetails principal,
        @PathVariable Long id
    ) {
        return ResponseEntity.ok(
            service.getListingThirdParty(id, principal.getId())
        );
    }
}

