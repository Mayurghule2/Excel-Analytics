/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        darkNavyBlue: '#0000b3',
        navyBlue: '#0010d9',
        royalBlue :'#0020ff' ,
        azureBlue :'#0040ff' ,
        skyBlue :'#0060ff' ,
        brightSky :'#0080ff' ,
        lightAqua :'#009fff' ,
        lightBlue :'#00bfff' ,
        cyan : '#00ffff' ,
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
