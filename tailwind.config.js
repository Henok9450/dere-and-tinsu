/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'sage-green': '#87A96B',
        'blush-pink': '#F8C8DC',
        'gold-accent': '#D4AF37',
        'warm-cream': '#FAF6F0',
        // Dark theme surfaces
        'dark-bg': '#0a0a0f',
        'dark-surface': '#111118',
        'dark-card': '#1a1a24',
        'dark-border': '#2a2a38',
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'script': ['"Marck Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}

