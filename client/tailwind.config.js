/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    }
  }
}

};
