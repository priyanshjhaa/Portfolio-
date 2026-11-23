import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  ...nextVitals,
  ...nextTs,
  {
    // React Compiler rules: the project doesn't use the compiler, so surface these as warnings.
    rules: {
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/use-memo': 'warn',
    },
  },
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'output/**', 'artifacts/**', 'tmp/**', 'scripts/**', 'Claude outputs/**'],
  },
];

export default config;
