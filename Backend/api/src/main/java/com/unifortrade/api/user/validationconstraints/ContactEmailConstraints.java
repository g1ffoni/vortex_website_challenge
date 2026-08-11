package com.unifortrade.api.user.validationconstraints;

import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.*;
import java.util.regex.Pattern;

import com.unifortrade.api.common.util.ValidationSupport;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({RECORD_COMPONENT, FIELD, PARAMETER, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = ContactEmailConstraints.Validator.class)
@Documented
public @interface ContactEmailConstraints {

    String message() default "Email is invalid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    boolean required() default false;

    class Validator implements ConstraintValidator<ContactEmailConstraints, String> {
        private boolean required;
        private static final Pattern PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
        );

        @Override
        public void initialize(ContactEmailConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(String value, ConstraintValidatorContext context) {
            if (value == null || value.isBlank()) {
                return required ? ValidationSupport.fail(context, "Email is required") : true;
            }

            if (value.length() > 255) {
                return ValidationSupport.fail(context, "Email must not exceed 255 characters");
            }

            if (!PATTERN.matcher(value).matches()) {
                return ValidationSupport.fail(context, "Email must be a valid address");
            }

            return true;
        }
    }
}

