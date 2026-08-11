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
@Constraint(validatedBy = PasswordConstraints.Validator.class)
@Documented
public @interface PasswordConstraints {

    String message() default "Password is invalid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    boolean required() default true;

    class Validator implements ConstraintValidator<PasswordConstraints, String> {
        private boolean required;

        @Override
        public void initialize(PasswordConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(String value, ConstraintValidatorContext context) {
            if (value == null || value.isBlank()) {
                return required ? ValidationSupport.fail(context, "Password is required") : true;
            }

            if (value.length() < 8) {
                return ValidationSupport.fail(context, "Password must be at least 8 characters");
            }

            if (value.length() > 72) {
                return ValidationSupport.fail(context, "Password must not exceed 72 characters");
            }

            if (!value.matches(".*[A-Za-z].*")) {
                return ValidationSupport.fail(context, "Password must contain at least one letter");
            }

            if (!value.matches(".*\\d.*")) {
                return ValidationSupport.fail(context, "Password must contain at least one digit");
            }

            return true;
        }
    }
}

