module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        footer: "#020104",
        "gray-background": "#212227",
        "gray-number": "#2A2C33",
        "gray-slot": "#313642",
        "purple-slot": "#937bfd",
        "dark-purple-500": "#76719B",
        "lottery-bg": "#111014",
        "gradient-1": "#937BFD",
        "gradient-2": "#CA87FF",
        "gradient-3": "#FF9CAE",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "scale(1.05)" },
          "50%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
}
