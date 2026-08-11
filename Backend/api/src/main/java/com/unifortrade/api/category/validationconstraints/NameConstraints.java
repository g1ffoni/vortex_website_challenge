package com.unifortrade.api.category.validationconstraints;

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
        public boolean isValid(
            String value,
            ConstraintValidatorContext context
        ) {
            if (value == null || value.isBlank()) {
                return required
                    ? ValidationSupport.fail(context, "Name is required")
                    : true;
            }
            if (value.length() < 2) {
                return ValidationSupport.fail(
                    context,
                    "Name must be at least 2 characters"
                );
            }
            if (value.length() > 100) {
                return ValidationSupport.fail(
                    context,
                    "Name must not exceed 100 characters"
                );
            }
            return true;
        }
    }
}

