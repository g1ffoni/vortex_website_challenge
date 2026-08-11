package com.unifortrade.api.common.util;

import java.text.Normalizer;
import java.util.regex.Pattern;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public final class SlugUtil {

    private static final int MAX_LENGTH = 120;
    private static final Pattern DIACRITICS = Pattern.compile("\\p{M}");
    private static final Pattern NON_ALPHANUMERIC = Pattern.compile("[^a-z0-9]+");
    private static final Pattern EDGE_HYPHENS = Pattern.compile("^-+|-+$");

    public static String slugify(String input) {
        String withoutDiacritics = DIACRITICS.matcher(
            Normalizer.normalize(input, Normalizer.Form.NFD)
        ).replaceAll("");

        String slug = EDGE_HYPHENS.matcher(
            NON_ALPHANUMERIC.matcher(withoutDiacritics.toLowerCase()).replaceAll("-")
        ).replaceAll("");

        if (slug.length() > MAX_LENGTH) {
            slug = EDGE_HYPHENS.matcher(slug.substring(0, MAX_LENGTH)).replaceAll("");
        }

        return slug.isEmpty() ? "category" : slug;
    }
}
