export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-green': '#00FF88',
        'cyber-dark': '#000000',
      },
      boxShadow: {
        'neon': '0 0 10px #00FF88, 0 0 20px #00FF88',
        'neon-lg': '0 0 20px #00FF88, 0 0 40px #00FF88',
      },
    },
  },
  plugins: [],
}
