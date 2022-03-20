module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    animations: {
      fadeInUp: 'fadeInUp 0.25s ease',
    },
    extend: {
      colors: {
        primary: '#105F49',
        secondary: '#337762',
      },
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
            '-webkit-transform': 'scale(0, 0)',
            transform: 'scale(0)',
            '-ms-transform': 'scale (0)',
            '-moz-transform': 'scale(0)',
            '-o-transform': 'scale(0)',
            opacity: '0',
          },
          '100%': {
            '-webkit-transform': 'scale(1, 1)',
            transform: 'scale(1)',
            '-ms-transform': 'scale (1)',
            '-moz-transform': 'scale(1)',
            '-o-transform': 'scale(1)',
            opacity: '1',
          },
        },
        scaleDown: {
          '0%': {
            '-webkit-transform': 'scale(1, 1)',
            transform: 'scale(1)',
            '-ms-transform': 'scale (1)',
            '-moz-transform': 'scale(1)',
            '-o-transform': 'scale(1)',
            opacity: '1',
          },
          '100%': {
            '-webkit-transform': 'scale(0, 0)',
            transform: 'scale(0)',
            '-ms-transform': 'scale (0)',
            '-moz-transform': 'scale(0)',
            '-o-transform': 'scale(0)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
