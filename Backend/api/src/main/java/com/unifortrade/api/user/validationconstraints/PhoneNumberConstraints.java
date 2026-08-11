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
@Constraint(validatedBy = PhoneNumberConstraints.Validator.class)
@Documented
public @interface PhoneNumberConstraints {

    String message() default "Phone number is invalid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    boolean required() default false;

    class Validator implements ConstraintValidator<PhoneNumberConstraints, String> {
        private boolean required;

        @Override
        public void initialize(PhoneNumberConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(String value, ConstraintValidatorContext context) {
            if (value == null || value.isBlank()) {
                return required ? ValidationSupport.fail(context, "Phone number is required") : true;
            }

            if (!value.matches("^\\+?[0-9]+$")) {
                return ValidationSupport.fail(context, "Phone number may only contain digits and an optional leading +");
            }

            String digitsOnly = value.startsWith("+") ? value.substring(1) : value;

            if (digitsOnly.length() < 7) {
                return ValidationSupport.fail(context, "Phone number is too short (minimum 7 digits)");
            }

            if (digitsOnly.length() > 15) {
                return ValidationSupport.fail(context, "Phone number is too long (maximum 15 digits)");
            }

            return true;
        }
    }
}

