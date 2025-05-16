/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Black for text and primary elements
        secondary: '#FF4500', // Orange for buttons and highlights (from image)
        background: '#FFF6F4', // Light peach background
        'accent-purple': '#7C3AED', // Purple for tags/hover states
        'light-orange': '#FFECE6', // Light orange for backgrounds
        'dark-orange': '#E03E00', // Darker orange for hover states
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'xl-soft': '0 15px 30px -5px rgba(0, 0, 0, 0.05), 0 10px 15px -5px rgba(0, 0, 0, 0.05)',
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
  mode: 'jit',
  purge: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}'
  ],
}
