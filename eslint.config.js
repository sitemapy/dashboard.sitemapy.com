import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "error", // Changed to error to match noUnusedLocals
      "no-unexpected-multiline": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "no-empty": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "no-restricted-imports": [
        "error",
        {
          patterns: ["src/**/*.{ts,tsx}"],
        },
      ],
    },
  },
  {
    files: ["*.test.ts", "**/scripts/*.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  }
);
