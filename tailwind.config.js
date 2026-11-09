/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#10283F',
          50: '#F0F4F8',
          100: '#D9E3EC',
          200: '#B0C5D8',
          300: '#7E9EBF',
          400: '#4D75A0',
          500: '#2A5582',
          600: '#1E3F65',
          700: '#17334F',
          800: '#10283F',
          900: '#0B1B2B',
          950: '#060F18',
        },
        // Replaced green with Clean Air Sapphire Blue for a fresh, mold-free aesthetic
        forest: {
          DEFAULT: '#1B5E91',
          50: '#F0F7FC',
          100: '#DFEFF9',
          200: '#BFE0F4',
          300: '#8CC7EC',
          400: '#52A8DF',
          500: '#2779B5',
          600: '#1B5E91',
          700: '#164C76',
          800: '#144063',
          900: '#123653',
          950: '#0C2338',
        },
        gold: {
          DEFAULT: '#C4A46A',
          50: '#FAF7F0',
          100: '#F4EDDD',
          200: '#E7D9BA',
          300: '#D9C293',
          400: '#C4A46A',
          500: '#AB8749',
          600: '#896934',
          700: '#674E27',
          800: '#47361B',
          900: '#281F0F',
        },
        warm: '#FAFBFD',
        lightgray: '#EBF0F5',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(16, 40, 63, 0.08)',
        'premium': '0 10px 30px -4px rgba(16, 40, 63, 0.12), 0 4px 12px -2px rgba(16, 40, 63, 0.05)',
        'card': '0 2px 12px rgba(16, 40, 63, 0.06)',
      }
    },
  },
  plugins: [],
}
