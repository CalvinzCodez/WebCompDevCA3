/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This sets up dark mode correctly

  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],

  theme: {
    extend: {
      // Your theme extensions here
    },
  },

  plugins: [
    require('flowbite/plugin'), // Make sure this is the correct plugin name
  ],
};
