package com.unifortrade.api.listing.validationconstraints;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.RECORD_COMPONENT;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.unifortrade.api.common.util.ValidationSupport;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Target({ RECORD_COMPONENT, FIELD, PARAMETER, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = DescriptionConstraints.Validator.class)
@Documented
public @interface DescriptionConstraints {
    String message() default "Description is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default true;

    class Validator
        implements ConstraintValidator<DescriptionConstraints, String>
    {

        private boolean required;

        @Override
        public void initialize(DescriptionConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(
            String value,
            ConstraintValidatorContext context
        ) {
            if (value == null || value.isBlank()) {
                return required
                    ? ValidationSupport.fail(context, "Description is required")
                    : true;
            }
            if (value.length() < 10) {
                return ValidationSupport.fail(
                    context,
                    "Description must be at least 10 characters"
                );
            }
            if (value.length() > 500) {
                return ValidationSupport.fail(
                    context,
                    "Description must not exceed 500 characters"
                );
            }
            return true;
        }
    }
}

