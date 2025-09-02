/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Active le mode sombre basé sur les classes
  theme: {
    extend: {
      colors: {
        // DigiKaz Color Palette - Thème Or Élégant
        'digikaz': {
          black: '#0a0a0a',
          'dark-gray': '#1a1a1a',
          gray: '#2a2a2a',
          'light-gray': '#3a3a3a',
          white: '#ffffff',
          'off-white': '#f8f9fa',
          gold: '#d4af37',
          'gold-light': '#e6c966',
          'gold-dark': '#b8941f',
        },
        // Mode Clair
        'digikaz-light': {
          black: '#ffffff',
          'dark-gray': '#f8f9fa',
          gray: '#e9ecef',
          'light-gray': '#dee2e6',
          white: '#0a0a0a',
          'off-white': '#1a1a1a',
          gold: '#d4af37',
          'gold-light': '#e6c966',
          'gold-dark': '#b8941f',
        },
        // Extend existing colors with gold palette
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        gold: {
          50: '#fefdf8',
          100: '#fdfaeb',
          200: '#faf4d1',
          300: '#f5e8a8',
          400: '#eed772',
          500: '#d4af37',
          600: '#b8941f',
          700: '#9d7b1a',
          800: '#82631b',
          900: '#6b4f1a',
        },
        amber: {
          400: '#e6c966',
          500: '#d4af37',
          600: '#b8941f',
        }
      },
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'blob': 'blob 7s infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 4px 15px rgba(212, 175, 55, 0.3)',
        'gold-hover': '0 6px 20px rgba(212, 175, 55, 0.4)',
        'card': '0 8px 25px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.5)',
      },
      // Ajout des classes utilitaires manquantes
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}
