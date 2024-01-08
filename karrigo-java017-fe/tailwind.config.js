/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        white: "#fff",
        "log-pri": "#6926d7",
        "log-pri2": "#eee3ff",
        black: "#000",
        "grey-300": "#d0d5dd",
        "green-2": "#27ae60",
        red: "#eb5757",
        "main-text": "#101828",
        dimgray: "#717171",
        gainsboro: "#ddd",
        gray: "#222",
        gray20: "#f5f5f5",
        gray60: "#9e9e9e",
      },
      fontSize: {
        base: "16px",
        "5xl": "24px",
        sm: "14px",
        xs: "12px",
        inherit: "inherit",
      },
      spacing: {},
      fontFamily: {
        "body-text-normal-16": "Inter",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
