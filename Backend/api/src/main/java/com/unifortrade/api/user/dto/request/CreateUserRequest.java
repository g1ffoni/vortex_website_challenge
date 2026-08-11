package com.unifortrade.api.user.dto.request;

import com.unifortrade.api.common.validation.constraints.UrlConstraints;
import com.unifortrade.api.user.validationconstraints.BioConstraints;
import com.unifortrade.api.user.validationconstraints.ContactEmailConstraints;
import com.unifortrade.api.user.validationconstraints.NameConstraints;
import com.unifortrade.api.user.validationconstraints.PasswordConstraints;
import com.unifortrade.api.user.validationconstraints.PhoneNumberConstraints;
import com.unifortrade.api.user.validationconstraints.UniforIdConstraints;

public record CreateUserRequest(
    @UniforIdConstraints(required = true) String uniforId,
    @PasswordConstraints(required = true) String password,
    @NameConstraints(required = true) String name,
    @BioConstraints(required = false) String bio,
    @UrlConstraints(required = false) String profilePicture,
    @PhoneNumberConstraints(required = true) String phoneNumber,
    @ContactEmailConstraints(required = true) String email
) {}

