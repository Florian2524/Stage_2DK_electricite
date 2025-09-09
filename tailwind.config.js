/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1d4ed8',   // bleu principal
          dark: '#0f172a',   // fond sombre (header/footer/sections)
          mid:  '#111827',   // gris très sombre
          light: '#0b1220',  // bleu très sombre (bandeaux)
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.08)',
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(to bottom right, rgba(0,0,0,.55), rgba(15,23,42,.65))',
        'cta-grad': 'linear-gradient(90deg, #0b1220 0%, #0f172a 35%, #1d4ed8 100%)',
      },
    },
  },
  plugins: [],
}
