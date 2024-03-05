/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          500: "#6379F4",
          700: "#4756E9",
        },
      },
      // Button styles
      buttons: {
        primary: {
          bg: "indigo-500", // Base color
          color: "white", // Text color
          "font-bold": true, // Bold font
          "rounded-md": true, // Rounded corners
          "px-4": true, // Horizontal padding
          "py-2": true, // Vertical padding
          "hover:bg": "indigo-700", // Hover background color
          "disabled:opacity": "0.5", // Opacity for disabled state
          "focus:outline": "none", // Remove focus outline
          "focus:ring": 2, // Focus ring size
          "focus:ring-offset": 2, // Focus ring offset
          "focus:ring-indigo-500": true, // Focus ring color
        },
      },
    },
  },
  plugins: [],
};


