/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#225fde",
        "dark-gradient-1": "#191923",
        "dark-gradient-2": "#001540",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "bg-fade-in": "bg-fade-in 1 ease",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "bg-fade-in": {
          from: { "bg-opacity": 0 },
          to: { "bg-opacity": 75 },
        },
      },
    },
  },
  plugins: [],
};
