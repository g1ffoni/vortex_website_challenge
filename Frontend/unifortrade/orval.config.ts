import { defineConfig } from "orval";

export default defineConfig({
  unifortrade: {
    input: {
      target: "./openapi.yaml",
    },
    output: {
      mode: "tags-split",
      target: "./src/lib/api/generated",
      schemas: "./src/lib/api/generated/models",
      client: "swr",
      httpClient: "axios",
      clean: true,
      indexFiles: true,
      override: {
        mutator: {
          path: "./src/lib/api/mutator.ts",
          name: "apiFetch",
        },
      },
    },
  },
});
