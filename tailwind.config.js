module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    animations: {
      fadeInUp: 'fadeInUp 0.25s ease',
    },
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': {
            top: '100vh',
          },
          '100%': {
            top: '0vh',
          },
        },
        fadeOutDown: {
          '0%': {
            top: '0vh',
          },
          '100%': {
            top: '100vh',
          },
        },
        scaleUp: {
          '0%': {
            transform: 'scale(0.2)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        scaleDown: {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
