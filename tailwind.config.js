/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      screens: {
        mobile: { max: '375px' },
      },

      colors: {
        background: 'var(--color-bg)',
        'background-form': 'var(--color-bg-form)',
        'background-highlighted': 'var(--color-bg-highlighted)',
        main: 'var(--color-main)',
        second: 'var(--color-second)',
        third: 'var(--color-third)',
        button: 'var(--color-button)',
        border: 'var(--color-border)',
        'text-main': 'var(--color-text-main)',
        'text-second': 'var(--color-text-second)',
        'text-third': 'var(--color-text-third)',
        'icon-main': 'var(--color-icon-main)',
        'icon-second': 'var(--color-icon-second)',
        error: 'var(--color-error)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
