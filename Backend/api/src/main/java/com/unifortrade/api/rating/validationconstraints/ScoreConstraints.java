package com.unifortrade.api.rating.validationconstraints;

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
@Constraint(validatedBy = ScoreConstraints.Validator.class)
@Documented
public @interface ScoreConstraints {
    String message() default "Score is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default true;

    class Validator implements ConstraintValidator<ScoreConstraints, Integer> {

        private boolean required;

        @Override
        public void initialize(ScoreConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(
            Integer value,
            ConstraintValidatorContext context
        ) {
            if (value == null) {
                return required
                    ? ValidationSupport.fail(context, "Score is required")
                    : true;
            }
            if (value < 1 || value > 5) {
                return ValidationSupport.fail(
                    context,
                    "Score must be between 1 and 5"
                );
            }
            return true;
        }
    }
}

