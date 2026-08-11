package com.unifortrade.api.user.service;

import com.unifortrade.api.common.exceptionhandling.exception.BadRequestException;
import com.unifortrade.api.common.exceptionhandling.exception.ConflictException;
import com.unifortrade.api.common.exceptionhandling.exception.NotFoundException;
import com.unifortrade.api.listing.entity.Listing;
import com.unifortrade.api.listing.repository.ListingRepository;
import com.unifortrade.api.user.dto.request.CreateUserRequest;
import com.unifortrade.api.user.dto.request.PatchUserRequest;
import com.unifortrade.api.user.dto.response.CurrentUserResponse;
import com.unifortrade.api.user.dto.response.ProfileResponse;
import com.unifortrade.api.user.entity.ContactInfo;
import com.unifortrade.api.user.entity.Profile;
import com.unifortrade.api.user.entity.User;
import com.unifortrade.api.user.mapper.UserMapper;
import com.unifortrade.api.user.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository repository;
    private final ListingRepository listingRepository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public ProfileResponse findById(Long id) {
        return mapper.toProfileResponse(findEntityById(id));
    }

    public ProfileResponse findByUniforId(String uniforId) {
        return mapper.toProfileResponse(findEntityByUniforId(uniforId));
    }

    public CurrentUserResponse getSelf(Long id) {
        return mapper.toCurrentUserResponse(findEntityById(id));
    }

    public User findEntityById(Long id) {
        User user = repository
            .findById(id)
            .orElseThrow(() -> NotFoundException.of("User", id));

        if (user.isDeleted()) {
            throw NotFoundException.of("User", id);
        }

        return user;
    }

    public User findEntityByUniforId(String uniforId) {
        User user = repository
            .findByUniforId(uniforId)
            .orElseThrow(() -> NotFoundException.of("User", uniforId));

        if (user.isDeleted()) {
            throw NotFoundException.of("User", uniforId);
        }

        return user;
    }

    @Transactional
    public CurrentUserResponse patch(Long userId, PatchUserRequest request) {
        User user = findEntityById(userId);

        if (request.name() != null) {
            user.getProfile().setName(request.name());
        }
        if (request.bio() != null) {
            user.getProfile().setBio(request.bio());
        }
        if (request.profilePicture() != null) {
            user.getProfile().setProfilePicture(request.profilePicture());
        }
        if (request.phoneNumber() != null) {
            String newPhoneNumber = request.phoneNumber();
            assureUniquePhoneNumber(newPhoneNumber, userId);
            user.getContactInfo().setPhoneNumber(newPhoneNumber);
        }
        if (request.email() != null) {
            String newEmail = request.email();
            assureUniqueEmail(newEmail, userId);
            user.getContactInfo().setEmail(newEmail);
        }

        return mapper.toCurrentUserResponse(repository.save(user));
    }

    @Transactional
    public CurrentUserResponse create(CreateUserRequest request) {
        assureUniqueUniforId(request.uniforId());
        assureUniqueEmail(request.email());
        assureUniquePhoneNumber(request.phoneNumber());

        User user = User.builder()
            .uniforId(request.uniforId())
            .contactInfo(
                ContactInfo.builder()
                    .email(request.email())
                    .phoneNumber(request.phoneNumber())
                    .build()
            )
            .profile(
                Profile.builder()
                    .name(request.name())
                    .bio(request.bio())
                    .profilePicture(request.profilePicture())
                    .build()
            )
            .passwordHash(passwordEncoder.encode(request.password()))
            .build();

        return mapper.toCurrentUserResponse(repository.save(user));
    }

    @Transactional
    public void delete(Long userId) {
        User user = findEntityById(userId);
        user.setDeleted(true);
        repository.save(user);

        List<Listing> listings = listingRepository.findByOwnerId(userId);
        listings.forEach(listing -> listing.setDeleted(true));
        listingRepository.saveAll(listings);
    }

    private void assureUniqueUniforId(String uniforId) {
        if (repository.existsByUniforId(uniforId)) {
            throw new BadRequestException(
                "This Unifor registration ID is already registered"
            );
        }
    }

    private void assureUniqueEmail(String email) {
        if (repository.existsByContactInfoEmail(email)) {
            throw new ConflictException(
                "Email '" + email + "' is already in use."
            );
        }
    }

    private void assureUniquePhoneNumber(String phoneNumber) {
        if (repository.existsByContactInfoPhoneNumber(phoneNumber)) {
            throw new ConflictException(
                "Phone number '" + phoneNumber + "' is already in use."
            );
        }
    }

    private void assureUniqueEmail(String email, Long userId) {
        if (repository.existsByContactInfoEmailAndIdNot(email, userId)) {
            throw new ConflictException(
                "Email '" + email + "' is already in use."
            );
        }
    }

    private void assureUniquePhoneNumber(String phoneNumber, Long userId) {
        if (
            repository.existsByContactInfoPhoneNumberAndIdNot(
                phoneNumber,
                userId
            )
        ) {
            throw new ConflictException(
                "Phone number '" + phoneNumber + "' is already in use."
            );
        }
    }
}

