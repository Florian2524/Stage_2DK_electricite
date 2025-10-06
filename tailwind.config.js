// tailwind.config.js
export default {
  content: [
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      // Largeur fixe desktop pour éviter les décalages d’un écran à l’autre
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        brand: {
          yellow: "#F6C90E",
          black: "#0B0B0B",
          zinc: "#18181B",
        },
      },
    },
  },
  plugins: [],
};
