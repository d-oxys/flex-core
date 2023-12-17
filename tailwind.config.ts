const { nextui } = require('@nextui-org/react');
import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
        suisseNeue: ['var(--font-suisse-neue)'],
      },
      colors: {
        'primary-1': '#2AA8FF',
        'primary-2': '#32B6C1',
        'primary-3': '#637381',
      },
    },
  },
  plugins: [require('flowbite/plugin'), nextui()],
  important: true,
  darkMode: 'class',
};
export default config;
