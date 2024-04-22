module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "import",
    "react",
    "react-hooks",
    "react-refresh",
    "@typescript-eslint",
    "prettier",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent", "index"],
          "type",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "react*",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/api/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/utils/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/pages/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/components/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/assets/*",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "unknown"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
