/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      darkGrey: {
        100: "hsl(var(--dark-grey-100))",
        200: "hsl(var(--dark-grey-200))",
      },
    },
    extend: {},
  },
  plugins: [],
};
