package com.unifortrade.api.rating.service;

import com.unifortrade.api.common.exceptionhandling.exception.BadRequestException;
import com.unifortrade.api.listing.claim.repository.ClaimRepository;
import com.unifortrade.api.notification.entity.Notification;
import com.unifortrade.api.notification.service.NotificationService;
import com.unifortrade.api.rating.dto.response.RatingResponse;
import com.unifortrade.api.rating.dto.response.UserRatingsResponse;
import com.unifortrade.api.rating.entity.Rating;
import com.unifortrade.api.rating.mapper.RatingMapper;
import com.unifortrade.api.rating.repository.RatingRepository;
import com.unifortrade.api.user.entity.User;
import com.unifortrade.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RatingService {

    private final RatingRepository ratingRepository;
    private final ClaimRepository claimRepository;
    private final UserService userService;
    private final NotificationService notificationService;
    private final RatingMapper mapper;

    public UserRatingsResponse findByRatedId(Long ratedId) {
        return mapper.toUserRatingsResponse(
            ratingRepository.findByRatedId(ratedId),
            ratingRepository.findAverageScoreByRatedId(ratedId)
        );
    }

    @Transactional
    public RatingResponse create(
        User rater,
        Long ratedId,
        int score,
        String comment
    ) {
        if (rater.getId().equals(ratedId)) {
            throw new BadRequestException("You can't rate yourself");
        }
        User rated = userService.findEntityById(ratedId);
        if (
            ratingRepository.existsByRaterIdAndRatedId(rater.getId(), ratedId)
        ) {
            throw new BadRequestException(
                "You have already rated this user"
            );
        }
        if (
            !claimRepository.existsCompletedClaimBetweenUsers(
                rater.getId(),
                ratedId
            )
        ) {
            throw new BadRequestException(
                "You can only rate someone you've completed a transaction with"
            );
        }
        Rating rating = Rating.builder()
            .rater(rater)
            .rated(rated)
            .score(score)
            .comment(comment)
            .build();
        RatingResponse response = mapper.toResponse(ratingRepository.save(rating));

        notificationService.create(
            rated,
            rater.getProfile().getName() +
            " left you a " +
            score +
            "-star rating.",
            Notification.LinkType.USER,
            rater.getId()
        );

        return response;
    }
}

