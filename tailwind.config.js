module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        circle: "circle .5s alternate-reverse infinite ease",
        shadow: "shadow .5s alternate infinite ease",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--gradient-color-stops))",
      },
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
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "scale(1.05)" },
          "50%": { transform: "scale(1)" },
        },
        circle: {
          "0%": {
            top: "60px",
            height: "5px",
            borderRadius: "50px 50px 25px 25px",
            transform: "scaleX(1.7)",
          },
          "40%": {
            height: "20px",
            borderRadius: "50%",
            transform: "scaleX(1)",
          },
          "100%": {
            top: "0%",
          },
          shadow: {
            "0%": {
              transform: "scaleX(1.5)",
            },
            "40%": {
              transform: "scaleX(1)",
              opacity: 0.7,
            },
            "100%": {
              transform: "scaleX(.2)",
              opacity: 0.4,
            },
          },
        },
      },
    },
  },
  plugins: [],
}
