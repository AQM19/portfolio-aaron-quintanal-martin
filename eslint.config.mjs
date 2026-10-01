import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// ESLint 9 flat config: `next lint` no longer exists in Next 16, `npm run lint` runs ESLint directly.
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**", "out/**", "public/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
