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
@Constraint(validatedBy = CommentConstraints.Validator.class)
@Documented
public @interface CommentConstraints {
    String message() default "Comment is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default false;

    class Validator implements ConstraintValidator<CommentConstraints, String> {

        private boolean required;

        @Override
        public void initialize(CommentConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(
            String value,
            ConstraintValidatorContext context
        ) {
            if (value == null || value.isBlank()) {
                return required
                    ? ValidationSupport.fail(context, "Comment is required")
                    : true;
            }

            if (value.length() > 2000) {
                return ValidationSupport.fail(
                    context,
                    "Comment must not exceed 2000 characters"
                );
            }
            return true;
        }
    }
}

