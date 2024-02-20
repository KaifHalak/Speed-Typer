/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{ejs,js}"],
  theme: {
    extend: {
      colors:{
        'fuel-yellow': {
          '50': '#fdf8e9',
          '100': '#faeec7',
          '200': '#f7dc91',
          '300': '#f2c052',
          '400': '#eeaf3a',
          '500': '#dc8e16',
          '600': '#be6c10',
          '700': '#984c10',
          '800': '#7e3d15',
          '900': '#6b3318',
          '950': '#3e180a',
      },
}
      
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],


  daisyui: {
    themes: ["light", "dim", "forest", {
          mytheme: {
          
              "primary": "#dc8e16",
                        
              "secondary": "#f2c052",
                        
              "accent": "#7e3d15",
                        
              "neutral": "#dc8e16",
                        
              "base-100": "#18181B",
                        
              "info": "#0000ff",
                        
              "success": "#00ff00",
                        
              "warning": "#00ff00",
                        
              "error": "#ff0000",
                        },
    }],
    darkTheme: "retro", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },

}