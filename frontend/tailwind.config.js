/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        300: '23%',
        800: '63%',
        1100: '88%',
      },
      screens: {
        ss: '300px',
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
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
        },
        main: '#CA965C',
      },
    },
    plugins: [],
  },
};
