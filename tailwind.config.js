export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-green': '#1E90FF',
        'cyber-dark': '#000000',
      },
      boxShadow: {
        'neon': '0 0 10px #1E90FF, 0 0 20px #1E90FF',
        'neon-lg': '0 0 20px #1E90FF, 0 0 40px #1E90FF',
      },
    },
  },
  plugins: [],
}
