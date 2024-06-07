/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
        keyframes: {
            typewriter: {
              '0%': { width: '0%' },
              '100%': { width: '100%' },
            },
            blink: {
              '0%, 100%': { 'border-color': 'transparent' },
              '50%': { 'border-color': 'black' },
            },
            erase: {
                '0%': { width: '100%' },
                '100%': { width: '0%' },
            },
          },
          animation: {
            typewriter: 'typewriter 4s steps(40) 1s 1 normal both',
            blink: 'blink 1s step-end infinite',
            erase: 'erase 2s steps(40) 1s 1 normal both',
          },
    },
  },
  plugins: [],
}

