package com.unifortrade.api.user.dto.request;

import com.unifortrade.api.common.validation.constraints.UrlConstraints;
import com.unifortrade.api.user.validationconstraints.BioConstraints;
import com.unifortrade.api.user.validationconstraints.ContactEmailConstraints;
import com.unifortrade.api.user.validationconstraints.NameConstraints;
import com.unifortrade.api.user.validationconstraints.PhoneNumberConstraints;

public record PatchUserRequest(
    @NameConstraints(required = false) String name,
    @BioConstraints(required = false) String bio,
    @UrlConstraints(required = false) String profilePicture,
    @PhoneNumberConstraints(required = false) String phoneNumber,
    @ContactEmailConstraints(required = false) String email
) {}

