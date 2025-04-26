/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#d4af37', // Or élégant
            dark: '#b8860b',    // Or foncé
            light: '#f1e5ac',   // Or clair
          },
          secondary: {
            DEFAULT: '#1c2938', // Bleu profond
          },
          tertiary: '#242424',  // Noir légèrement plus clair pour contraste
        },
        fontFamily: {
          primary: ['Montserrat', 'sans-serif'],
          secondary: ['Playfair Display', 'serif'],
          tertiary: ['Cormorant Garamond', 'serif'],
        },
        boxShadow: {
          'sm': '0 2px 4px rgba(0, 0, 0, 0.08)',
          'md': '0 4px 12px rgba(0, 0, 0, 0.1)',
          'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
          'xl': '0 12px 32px rgba(0, 0, 0, 0.15)',
        },
        borderRadius: {
          'sm': '4px',
          'md': '6px',
          'lg': '8px',
        },
      },
    },
    plugins: [],
  }