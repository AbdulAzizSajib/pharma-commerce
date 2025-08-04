/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'oklch(68.5% 0.169 237.323)',

      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
