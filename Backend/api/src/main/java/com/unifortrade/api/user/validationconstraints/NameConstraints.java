package com.unifortrade.api.user.validationconstraints;

import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.*;

import com.unifortrade.api.common.util.ValidationSupport;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({RECORD_COMPONENT, FIELD, PARAMETER, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = NameConstraints.Validator.class)
@Documented
public @interface NameConstraints {

    String message() default "Name is invalid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    boolean required() default true;

    class Validator implements ConstraintValidator<NameConstraints, String> {
        private boolean required;

        @Override
        public void initialize(NameConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(String value, ConstraintValidatorContext context) {
            if (value == null || value.isBlank()) {
                return required ? ValidationSupport.fail(context, "Name is required") : true;
            }

            String trimmed = value.trim();

            if (trimmed.length() < 2) {
                return ValidationSupport.fail(context, "Name must be at least 2 characters");
            }

            if (trimmed.length() > 100) {
                return ValidationSupport.fail(context, "Name must not exceed 100 characters");
            }

            if (!trimmed.matches("^[\\p{L}\\s'-]+$")) {
                return ValidationSupport.fail(context, "Name may only contain letters, spaces, hyphens, and apostrophes");
            }

            return true;
        }
    }
}

