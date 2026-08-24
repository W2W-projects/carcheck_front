/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "brand": "#FF7400",
        "primary-orange": "#FF7400"
      },
      backgroundColor: {
        "brand": "#FF7400",
        "primary-orange": "#FF7400"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
