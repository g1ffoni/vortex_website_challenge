package com.unifortrade.api.rating.dto.request;

import com.unifortrade.api.rating.validationconstraints.CommentConstraints;
import com.unifortrade.api.rating.validationconstraints.ScoreConstraints;

public record CreateRatingRequest(
    @ScoreConstraints(required = true) Integer score,
    @CommentConstraints(required = false) String comment
) {}

