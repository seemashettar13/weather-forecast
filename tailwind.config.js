/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html"],
  theme: {
    extend: {
width:{
  "82" : "360px",
  "84" : "375px",
  "84.5" : "420px",
  "96.5" : "630px", 
  // "96.7" : "700px",  //96 : 384px
  "97" : "700px", 
  "97.5" : "900px",
  "97.6" : "1099px",
  "97.7" : "1150px", 
  "98" : "1250px",
  "98.5" : "1300px",
  "99" : "1460px",
  "99.5" : "1520px",
  "100" : "1600px"
},
height: {
  "97" : "450px"
},
screens :{
   "3xl" : "1601px",
   "4xl" : "1881px",
   "5xl" : "2177px"
},
animation: {
  bounceOnce: "bounceOnce 0.5s ease-in-out",
  slowRotate: "slowRotate 5s ease-in-out ",
  shake: "shake 0.3s ease-in-out infinite",
},
keyframes: {
  bounceOnce: {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-10px)" },
  },
  slowRotate: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  shake: {
    "0%, 100%": { transform: "translateX(0)" },
    "25%": { transform: "translateX(-5px)" },
    "50%": { transform: "translateX(5px)" },
    "75%": { transform: "translateX(-5px)" },
  },
},

    },
  },
  plugins: [],
}

