/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B6B4F',
          50: '#E8F4F0',
          100: '#D2E9E1',
          200: '#A6D3C3',
          300: '#6FB69B',
          400: '#3D9676',
          500: '#0B6B4F',
          600: '#095A42',
          700: '#074835',
          800: '#053526',
          900: '#03231A',
        },
        accent: {
          DEFAULT: '#C6F432',
          light: '#DFFA6A',
          dark: '#A8D20F',
        },
        background: '#F6FAF7',
        surface: '#FFFFFF',
        ink: '#0E1A15',
        muted: '#5B6B63',
        border: '#DCE7E0',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(14, 26, 21, 0.04), 0 8px 24px rgba(14, 26, 21, 0.06)',
        lift: '0 4px 12px rgba(14, 26, 21, 0.06), 0 16px 40px rgba(14, 26, 21, 0.10)',
        glow: '0 0 0 6px rgba(198, 244, 50, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float-in': {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '60%': { transform: 'scale(1.03)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'float-in': 'float-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pop': 'pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
};
