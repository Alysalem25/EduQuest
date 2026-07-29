/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        eqraa: {
          brown: '#6B4A2B',
          'brown-dark': '#4B3220',
          'brown-light': '#8a6a48',
          beige: '#E9D8C3',
          'beige-light': '#F8F4EF',
          'beige-dark': '#dcc7a9',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
        '5xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(75, 50, 32, 0.12)',
        'soft-lg': '0 12px 40px -8px rgba(75, 50, 32, 0.18)',
        'soft-xl': '0 24px 64px -12px rgba(75, 50, 32, 0.22)',
        glow: '0 0 0 4px rgba(107, 74, 43, 0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
        shimmer: 'shimmer 1.5s linear infinite',
        'spin-slow': 'spin-slow 1.1s linear infinite',
      },
    },
  },
  plugins: [],
};
