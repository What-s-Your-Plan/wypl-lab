/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        300: '23%',
        400: '30%',
        500: '47%',
        800: '63%',
        900: '70%',
        1100: '88%',
        1200: '92%',
        1300: '100%',
      },
      screens: {
        ss: '300px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        label: {
          red: '#F2594F',
          pink: '#FFA9A3',
          orange: '#FF9548',
          yellow: '#FFD662',
          green: '#62C434',
          leaf: '#98DF7B',
          blue: '#4970FA',
          sky: '#9DC8FA',
          navy: '#1D3B88',
          indigo: '#7F99D9',
          purple: '#8627C1',
          lavender: '#C483EC',
          charcoal: '#5E5E5E',
          brown: '#876445',
        },
        default: {
          white: '#FAFAF9',
          black: '#2A2E34',
          coolgray: '#DFDFDF',
          warmgray: '#F3EEEA',
        },
        main: '#CA965C',
      },
    },
    plugins: [],
  },
};
