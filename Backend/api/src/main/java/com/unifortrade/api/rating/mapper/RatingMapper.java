package com.unifortrade.api.rating.mapper;

import com.unifortrade.api.rating.dto.response.RatingResponse;
import com.unifortrade.api.rating.dto.response.UserRatingsResponse;
import com.unifortrade.api.rating.entity.Rating;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class RatingMapper {

    public RatingResponse toResponse(Rating rating) {
        return new RatingResponse(
            rating.getId(),
            rating.getRater().getId(),
            raterDisplayName(rating),
            rating.getRated().getId(),
            rating.getScore(),
            rating.getComment(),
            rating.getCreatedAt()
        );
    }

    public UserRatingsResponse toUserRatingsResponse(
        List<Rating> ratings,
        Double average
    ) {
        List<RatingResponse> responses = ratings
            .stream()
            .map(this::toResponse)
            .toList();
        return new UserRatingsResponse(responses, average, responses.size());
    }

    private String raterDisplayName(Rating rating) {
        var profile = rating.getRater().getProfile();
        return profile != null ? profile.getName() : null;
    }
}

