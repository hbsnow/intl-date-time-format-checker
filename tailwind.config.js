/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */

const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  // NOTE: https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
  mode: process.env.NODE_ENV ? "jit" : undefined,
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: defaultTheme.fontFamily.sans,
      title: ["Nunito", ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};

module.exports = config;
