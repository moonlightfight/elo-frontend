module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        hero: "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/heroimage.jpeg')",
      }),
    },
    fontFamily: {
      heading: ["Great Vibes", "cursive"],
      body: ["Dosis", "sans-serif"],
    },
    boxShadow: {
      full: "12px 12px 5px 1px rgba(0,0,0,0.75)",
      half: "6px 6px 5px 1px rgba(0,0,0,0.75)",
    },
    transitionDuration: {
      3: "3ms",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
