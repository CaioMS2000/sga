import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      daisyui: {
        themes: ["light", "dark",],
      },
      colors: {
        CRMVGO_greenishBlack: '#1d1f1d',
        CRMVGO_lightGrey: '#ebebeb',
        CRMVGO_darkGreen: '#224027',
        CRMVGO_lightNavyBlue: '#0094c6',
        CRMVGO_byzantineBlue: '#3454D1',
        CRMVGO_turquoise: '#34D1BF',
        CRMVGO_slateGray: '#767B91',
        CRMVGO_CentralDeEventos_DeepBlack: '#212529',
        CRMVGO_CentralDeEventos_DarkCharcoal: '#393939',
        CRMVGO_CentralDeEventos_SteelGray: '#343A40',
        CRMVGO_CentralDeEventos_SlateGray: '#495057',
        CRMVGO_CentralDeEventos_LightGray: '#DEE2E6',
        CRMVGO_CentralDeEventos_PaleBlueGray: '#E9ECEF',
        CRMVGO_CentralDeEventos_DarkSteelGray: '#6C757D',
        CRMVGO_CentralDeEventos_EmeraldGreen: '#2B8473',
        CRMVGO_CentralDeEventos_SeaGreen: '#4FB09B',
        CRMVGO_CentralDeEventos_DeepForestGreen: '#1a2617',
        CRMVGO_CentralDeEventos_DarkGreen: '#0d140c',
        CRMVGO_CentralDeEventos_OliveGreen: '#728824',
        CRMVGO_CentralDeEventos_BrickRed: '#D95A4A',
        greenishBlack: '#1d1f1d',
        lightGrey: '#ebebeb',
        darkGreen: '#224027',
        darkGreen2: '#1A2617',
        lightNavyBlue: '#0094c6',
        byzantineBlue: '#3454D1',
        turquoise: '#34D1BF',
        slateGray: '#767B91',
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
export default config
