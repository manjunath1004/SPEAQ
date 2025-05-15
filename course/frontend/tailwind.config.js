/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React component files
    "./public/index.html",        // CRA uses this
  ],
  theme: {
    extend: {
      animation: {
        'fade-out': 'fadeOut 2s ease-out', // Fade-out animation
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
