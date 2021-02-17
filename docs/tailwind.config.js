module.exports = {
  plugins: [require('@tailwindcss/ui')], // eslint-disable-line global-require
  future: {
    applyComplexClasses: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    colors: {
      white: 'var(--color-white)',
    },
  },
};
