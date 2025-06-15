import('tailwindcss').Configmodule.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your project structure
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
      require('tailwind-scrollbar-hide')
    ],
  };