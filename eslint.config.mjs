import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable the rule entirely
      // Or set it to "warn" if you want warnings instead of errors
      // "@typescript-eslint/no-explicit-any": "warn"
      "no-var": "off",
    },
  },
];

export default eslintConfig;
