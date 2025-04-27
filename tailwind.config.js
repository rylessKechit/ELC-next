/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d4af37', // Or élégant - couleur d'origine d'ELC
          dark: '#b8860b',    // Or foncé - couleur d'origine d'ELC
          light: '#f1e5ac',   // Or clair - couleur d'origine d'ELC
        },
        secondary: {
          DEFAULT: '#1c2938', // Bleu profond - couleur d'origine d'ELC
          dark: '#141e2a',    // Version plus foncée pour les hovers
        },
        tertiary: '#242424',  // Noir légèrement plus clair pour contraste
        dark: '#1c2938',      // Base du header/footer - même que secondary
        light: '#f8f9fa',     // Couleur pour sections alternées
        "text-dark": '#333333',
        "text-light": '#666666',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Playfair Display', 'serif'],
        tertiary: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'xl': '0 12px 32px rgba(0, 0, 0, 0.15)',
        'custom': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'slide-in-up': 'slideInUp 0.8s ease-out',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}