/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            width: {
                "7/10": "70%",
                "3/10": "30%",
                "5/10": "50%",
                "3.3/10": "33%",
            },
        },
    },
    plugins: [],
};
