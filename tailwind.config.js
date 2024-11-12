/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        mg: '1276px',
        slg: '1212px',
        nlg: '1205px',
        mlg: '1000px',
        clg: '1025px',
        mmg: '900px',
        smm: '590px',
        mng: '641px',
        smn: '500px',
      },
      colors: {
        primary: '#5a6e85',
        secondary: '#3b82f6',
        tertiary: '#1E1E1E',
      },
      animation: {
        blink: 'blink 2s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
