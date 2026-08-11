package com.unifortrade.api.listing.mapper;

import com.unifortrade.api.category.mapper.CategoryMapper;
import com.unifortrade.api.listing.dto.response.ContactResponse;
import com.unifortrade.api.listing.dto.response.ListingResponse;
import com.unifortrade.api.listing.dto.response.ListingSummaryResponse;
import com.unifortrade.api.listing.entity.Listing;
import com.unifortrade.api.user.entity.User;
import com.unifortrade.api.user.mapper.UserMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ListingMapper {

    private final CategoryMapper categoryMapper;
    private final UserMapper userMapper;

    public ListingResponse toResponse(Listing listing) {
        return new ListingResponse(
            listing.getId(),
            listing.getTitle(),
            listing.getDescription(),
            listing.getType(),
            listing.getPrice(),
            List.copyOf(listing.getGallery()),
            listing.getStatus(),
            categoryMapper.toResponse(listing.getCategory()),
            userMapper.toProfileResponse(listing.getOwner()),
            listing.getCreatedAt()
        );
    }

    public ListingSummaryResponse toSummaryResponse(Listing listing) {
        List<String> gallery = listing.getGallery();
        return new ListingSummaryResponse(
            listing.getId(),
            listing.getTitle(),
            listing.getPrice(),
            (gallery == null || gallery.isEmpty()) ? null : gallery.get(0),
            listing.getStatus(),
            listing.getCategory().getName()
        );
    }

    public ContactResponse toContactResponse(User user) {
        return new ContactResponse(
            user.getId(),
            user.getProfile() != null ? user.getProfile().getName() : null,
            user.getContactInfo() != null ? user.getContactInfo().getEmail() : null,
            user.getContactInfo() != null
                ? user.getContactInfo().getPhoneNumber()
                : null
        );
    }
}

