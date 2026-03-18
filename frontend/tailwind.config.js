/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ethnic: ['"Cinzel Decorative"', 'serif'],
        royal: ['"Playfair Display"', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        rajasthan: {
          navy: '#0B1021', // Deep midnight palatial sky
          blue: '#1A2A54',
          maroon: '#5A0B14', // Rich Royal Maroon
          red: '#9B111E', // Ruby Jaipur Red
          pink: '#E83E8C', // Jaipur Pink
          saffron: '#FF6F00', // Saffron Desert Sun
          gold: '#D4AF37', // Pure Fort Gold
          lightGold: '#F3E5AB', // Soft Sand Gold
          sand: '#F5ECE3', // Sandstone beige
        }
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(135deg, #0B1021 0%, #1A2A54 50%, #5A0B14 100%)',
        'sand-gradient': 'linear-gradient(to bottom, #F5ECE3, #FFF)',
        'sunset-gradient': 'linear-gradient(to top, rgba(155, 17, 30, 0.8), rgba(255, 111, 0, 0.4), transparent)',
        'texture-dust': "url('https://www.transparenttextures.com/patterns/dust.png')",
        'texture-sand': "url('https://www.transparenttextures.com/patterns/sandpaper.png')",
        'texture-mandala': "url('https://www.transparenttextures.com/patterns/arabic-motif.png')"
      },
      animation: {
        'dust-drift': 'dustDrift 30s linear infinite',
        'subtle-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        dustDrift: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #D4AF37, 0 0 10px #D4AF37, 0 0 20px #D4AF37' },
          '100%': { boxShadow: '0 0 10px #D4AF37, 0 0 20px #FF6F00, 0 0 30px #FF6F00' }
        }
      }
    },
  },
  plugins: [],
}
