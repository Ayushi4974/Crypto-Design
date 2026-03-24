/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ff8c00",
                secondary: "#ff4d00",
                dark: "#0a0a0c",
                card: "#141417",
                sidebar: "#0f0f12",
                'gold': {
                    light: '#FFD700',
                    DEFAULT: '#D4AF37',
                    dark: '#B8860B',
                },
                'deep-black': '#05070A',
                'electric-blue': '#00B4D8',
                'luxury-grey': '#A0A0A0',
            },
            backgroundImage: {
                'gradient-orange': 'linear-gradient(135deg, #ff8c00 0%, #ff4d00 100%)',
                'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                'gradient-luxury': 'radial-gradient(circle at 50% 50%, #141417 0%, #05070A 100%)',
            },
            boxShadow: {
                'orange-glow': '0 0 20px rgba(255, 140, 0, 0.15)',
                'gold-glow': '0 0 30px rgba(212, 175, 55, 0.2)',
            }
        },
    },
    plugins: [],
}
