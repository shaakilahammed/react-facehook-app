/** @type {import('tailwindcss').Config} */
import Typography from '@tailwindcss/typography';
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svg}'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                lwsGreen: '#00D991',
                deepDark: '#17181C',
                mediumDark: '#1E1F24',
                lighterDark: '#27292F',
            },
        },
    },
    plugins: [Typography],
};
