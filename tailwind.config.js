/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif']
      },
      lineHeight: {
        20: '5rem'
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms'
      }
    }
  },
  variants: {
    extend: {
      transitionDuration: ['hover', 'focus']
    }
  },
  plugins: []
}
