package com.unifortrade.api.common.validation.constraints;

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
@Constraint(validatedBy = IdConstraints.Validator.class)
@Documented
public @interface IdConstraints {
    String message() default "Id is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default true;

    class Validator implements ConstraintValidator<IdConstraints, Long> {

        private boolean required;

        @Override
        public void initialize(IdConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(
            Long value,
            ConstraintValidatorContext context
        ) {
            if (value == null) {
                return required
                    ? ValidationSupport.fail(context, "Id is required")
                    : true;
            }
            if (value <= 0) {
                return ValidationSupport.fail(
                    context,
                    "Id must be positive"
                );
            }
            return true;
        }
    }
}

