/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        md2: "448px",
      },
      colors: {
        primary: "#f13a01",
        darkPrimary: "rgb(216 ,54 ,4)",
        card: "rgb(229 231 235)",
        textColor: "rgb(107 114 128)",
        headingColor: "#000000",
      },
    },
  },
  plugins: [],
};
