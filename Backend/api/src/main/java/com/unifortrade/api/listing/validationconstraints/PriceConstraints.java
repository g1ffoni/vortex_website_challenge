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
import java.math.BigDecimal;

@Target({ RECORD_COMPONENT, FIELD, PARAMETER, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = PriceConstraints.Validator.class)
@Documented
public @interface PriceConstraints {
    String message() default "Price is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default true;

    class Validator
        implements ConstraintValidator<PriceConstraints, BigDecimal>
    {

        private boolean required;

        @Override
        public void initialize(PriceConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(
            BigDecimal value,
            ConstraintValidatorContext context
        ) {
            if (value == null) {
                return required
                    ? ValidationSupport.fail(context, "Price is required")
                    : true;
            }
            if (value.compareTo(BigDecimal.ZERO) < 0) {
                return ValidationSupport.fail(
                    context,
                    "Price must not be negative"
                );
            }
            if (value.precision() - value.scale() > 8) {
                return ValidationSupport.fail(
                    context,
                    "Price must not exceed 8 digits before the decimal point"
                );
            }
            if (value.scale() > 2) {
                return ValidationSupport.fail(
                    context,
                    "Price must not have more than 2 decimal places"
                );
            }
            return true;
        }
    }
}

