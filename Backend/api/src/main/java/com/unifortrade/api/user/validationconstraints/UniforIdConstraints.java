package com.unifortrade.api.user.validationconstraints;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.unifortrade.api.common.util.ValidationSupport;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target({ RECORD_COMPONENT, FIELD, PARAMETER, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = UniforIdConstraints.Validator.class)
@Documented
public @interface UniforIdConstraints {
    String message() default "Uniforid is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default true;

    class Validator
        implements ConstraintValidator<UniforIdConstraints, String>
    {

        private boolean required;

        @Override
        public void initialize(UniforIdConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(
            String value,
            ConstraintValidatorContext context
        ) {
            if (value == null || value.isBlank()) {
                return required
                    ? ValidationSupport.fail(context, "Uniforid is required")
                    : true;
            }

            if (!value.matches("^[0-9]{6}$")) {
                return ValidationSupport.fail(
                    context,
                    "Uniforid must be exactly 6 digits"
                );
            }

            return true;
        }
    }
}

