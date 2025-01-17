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
      zIndex: {
        60: "60",
        70: "70",
      },
      fontSize: {
        xxs: "0.65rem",
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.2, 0, 0, 1)",
      },
      transitionDuration: {
        250: "250ms",
        150: "150ms",
        0: "0ms",
      },
      transitionDelay: {
        100: "100ms",
        125: "125ms",
      },
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
        light: "#6A6A6A",
        bold: "#222222",
        tomato: "#ff385c",
        secondary: "#F7F7F7",
      },
      boxShadow: {
        "mobile-filter": "1px 1px 7px 1px rgb(0 0 0 / 20%)",
        "solid-black": "0 0 0 1px #000",
        "solid-black-2": "0 0 0 2px #000",
        "solid-black-3": "0 0 0 3px #000",
        "custom-gray": "0 0 0 1px #dddddd",
        "search-box-active": "0px 0px 27px 1px #a3a3a3",
        "search-box-inactive":
          "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
        bottom: "#dddddd 0 1px 0",
        "bottom-2": "0 2px 0 0 rgba(0, 0, 0, 0.1)",
        "bottom-3": "0 3px 0 0 rgba(0, 0, 0, 0.1)",
        "bottom-4": "0 4px 0 0 rgba(0, 0, 0, 0.1)",
        "bottom-black-2": "0 2px 0 0 rgba(0, 0, 0, 1)",
        "floating-card":
          "0 0 2px 1px rgb(0 0 0/4%),0px 3px 12px rgb(0 0 0/20%)",
      },
      width: {
        "2px": "2px",
        21: "21rem",
        98: "28rem",
        100: "32rem",
        30: "30rem",
        33: "33rem",
        37: "37rem",
        104: "40rem",
        108: "50rem",
      },
      height: {
        "2px": "2px",
        100: "32rem",
        104: "40rem",
        108: "50rem",
      },
      backgroundImage: {
        primary:
          "radial-gradient( circle at center,#FF385C 0%,#e61e4d 27.5%,#e31c5f 40%,#d70466 57.5%,#bd1e59 75%,#bd1e59 100% );",
        "custom-right-gradient-white":
          "linear-gradient(to right, rgba(255, 255, 255, 0), white 26px)",
        "custom-left-gradient-white":
          "linear-gradient(to left, rgba(255, 255, 255, 0), white 19px)",
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
