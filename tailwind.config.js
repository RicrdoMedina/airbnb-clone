/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      backgroundColor: ["group-hover", "selected-arrival-hover"],
      textColor: ["group-hover"],
      colors: {
        "custom-gray": {
          100: "#f0f0f0",
          200: "#ebebeb",
          300: "#dddddd",
          400: "#bfbfbf",
          500: "#a3a3a3",
        },
        light: "#655d5d",
        bold: "#000",
        tomato: "#ff385c",
      },
      boxShadow: {
        "solid-black": "0 0 0 1px #000",
        "solid-black-2": "0 0 0 2px #000",
        "custom-gray": "0 0 0 1px #dddddd",
        "search-box-active": "0px 0px 27px 1px #a3a3a3",
        "search-box-inactive":
          "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
      },
      width: {
        "2px": "2px",
        100: "32rem",
        104: "40rem",
        108: "50rem",
      },
      backgroundImage: {
        primary:
          "radial-gradient( circle at center,#FF385C 0%,#e61e4d 27.5%,#e31c5f 40%,#d70466 57.5%,#bd1e59 75%,#bd1e59 100% );",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1732px",
      // => @media (min-width: 1732px) { ... }
    },
  },
  plugins: [],
};
