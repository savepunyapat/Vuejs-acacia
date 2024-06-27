/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {}
  },
  plugins: [flowbitePlugin]
};
