/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rajasthan: {
          navy: '#0B1E59',   // Match the logo's deep background
          blue: '#1E3A8A',   // For hover effects
          gold: '#FFD700',   // Match the logo's gold text
          yellow: '#FFCA28',
          red: '#D50000',    // Vibrant Royal Red
          maroon: '#880E4F', // Deep Pink/Maroon (Bandhani inspired)
          orange: '#FF6D00', // Marigold Orange
          pink: '#F50057',   // Vibrant Fuchsia/Pink
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        ethnic: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
