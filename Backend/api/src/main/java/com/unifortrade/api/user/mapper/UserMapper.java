package com.unifortrade.api.user.mapper;

import com.unifortrade.api.user.dto.response.ContactInfoResponse;
import com.unifortrade.api.user.dto.response.CurrentUserResponse;
import com.unifortrade.api.user.dto.response.ProfileResponse;
import com.unifortrade.api.user.entity.ContactInfo;
import com.unifortrade.api.user.entity.Profile;
import com.unifortrade.api.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public ProfileResponse toProfileResponse(User user) {
        Profile profile = user.getProfile();
        return new ProfileResponse(
            user.getId(),
            profile != null ? profile.getName() : null
        );
    }

    public CurrentUserResponse toCurrentUserResponse(User user) {
        ContactInfo contactInfo = user.getContactInfo();
        return new CurrentUserResponse(
            user.getUniforId(),
            toProfileResponse(user),
            new ContactInfoResponse(
                contactInfo != null ? contactInfo.getPhoneNumber() : null,
                contactInfo != null ? contactInfo.getEmail() : null
            )
        );
    }
}

