/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Montserrat', 'sans-serif'],
            },
            colors: {
                orionBlue: '#0030FF',
                orionBlueDeep: '#0022b3',
                orionTeal: '#1D9E75',
                orionDark: '#0a0a2a',
                orionSurface: '#F7F8FA',
                orionYellow: '#FFCF00',
            },
            fontSize: {
                'booth-body': ['18px', { lineHeight: '1.5' }],
                'booth-h3': ['22px', { lineHeight: '1.35', fontWeight: '600' }],
                'booth-h2': ['28px', { lineHeight: '1.25', fontWeight: '700' }],
                'booth-h1': ['44px', { lineHeight: '1.15', fontWeight: '700' }],
                'booth-hero': ['72px', { lineHeight: '1.05', fontWeight: '800' }],
            },
            boxShadow: {
                'booth-card': '0 10px 40px -10px rgba(24, 95, 165, 0.18)',
                'booth-soft': '0 4px 18px -4px rgba(44, 44, 42, 0.10)',
            },
            keyframes: {
                'pipeline-flow': {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '40%': { opacity: '1' },
                    '100%': { transform: 'translateX(100%)', opacity: '0' },
                },
                'teal-glow': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(29, 158, 117, 0)' },
                    '50%': { boxShadow: '0 0 40px 4px rgba(29, 158, 117, 0.45)' },
                },
                'soft-pulse': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
                    '50%': { transform: 'scale(1.04)', opacity: '1' },
                },
            },
            animation: {
                'pipeline-flow': 'pipeline-flow 2.2s linear infinite',
                'teal-glow': 'teal-glow 2.5s ease-in-out infinite',
                'soft-pulse': 'soft-pulse 1.6s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
