module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: "360px",
      tablet: "768px",
      desktop: "1024px",
      wide: "1280px",
      extraWide: "1536px",
    },
    fontFamily: {
      karla: ["Karla", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}
