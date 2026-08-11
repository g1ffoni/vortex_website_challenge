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
@Constraint(validatedBy = TitleConstraints.Validator.class)
@Documented
public @interface TitleConstraints {
    String message() default "Title is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default true;

    class Validator implements ConstraintValidator<TitleConstraints, String> {

        private boolean required;

        @Override
        public void initialize(TitleConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(
            String value,
            ConstraintValidatorContext context
        ) {
            if (value == null || value.isBlank()) {
                return required
                    ? ValidationSupport.fail(context, "Title is required")
                    : true;
            }
            if (value.length() < 3) {
                return ValidationSupport.fail(
                    context,
                    "Title must be at least 3 characters"
                );
            }
            if (value.length() > 100) {
                return ValidationSupport.fail(
                    context,
                    "Title must not exceed 100 characters"
                );
            }
            return true;
        }
    }
}

