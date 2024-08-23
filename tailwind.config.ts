import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      "coffee",
      "forest",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      {
        mytheme: {
          primary: "#000f08ff", // Night
          secondary: "#136f63ff", // Pine Green
          accent: "#e0ca3cff", // Citrine
          neutral: "#f34213ff", // Coquelicot
          "base-100": "#3e2f5bff", // Russian Violet
        },
      },
      {
        mytheme1: {
          primary: "#e28413ff", // Fulvous
          secondary: "#f56416ff", // Orange Pantone
          accent: "#dd4b1aff", // Flame
          neutral: "#ef271bff", // Chili Red
          "base-100": "#ea1744ff", // Red Crayola (Darkest)
        },
      },
      {
        mytheme2: {
          primary: "#c97b84ff", // Old Rose
          secondary: "#a85751ff", // Redwood
          accent: "#7d2e68ff", // Byzantium
          neutral: "#251351ff", // Russian Violet
          "base-100": "#040926ff", // Oxford Blue (Darkest)
        },
      },
      {
        mytheme3: {
          primary: "#0dab76ff", // Jade
          secondary: "#139a43ff", // Pigment Green
          accent: "#0b5d1eff", // Dartmouth Green
          neutral: "#053b06ff", // Pakistan Green
          "base-100": "#000000ff", // Black (Darkest)
        },
      },
      {
        mytheme4: {
          primary: "#ffc53aff", // Mikado Yellow
          secondary: "#faff81ff", // Icterine
          accent: "#e06d06ff", // Cocoa Brown
          neutral: "#b26700ff", // Tiger's Eye
          "base-100": "#161032ff", // Dark Purple (Darkest)
        },
      },
      {
        dark: {
          primary: "#DEAC12",
          secondary: "#259293",
          accent: "#E0350A",
          neutral: "#2EB79C",
          "base-100": "#080D0F",
          "base-200": "#0D1618",
          "base-300": "#0E2D3B",
          info: "#A1B229",
          ghost: "#911A07",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "4rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "4rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
      {
        light: {
          primary: "#1B1750",

          "primary-content": "#cbcddb",

          secondary: "#F3D315",

          "secondary-content": "#141000",

          accent: "#E22C07",

          "accent-content": "#141000",

          neutral: "#208A98",

          "neutral-content": "#000708",

          "base-100": "#B0C4CC",

          "base-200": "#99aab1",

          "base-300": "#829197",

          "base-content": "#0b0e0f",

          info: "#115842",

          "info-content": "#cfdcd6",

          success: "#1D8A72",

          "success-content": "#000704",

          warning: "#7C0D10",

          "warning-content": "#e8cfcc",

          error: "#CF4F2C",

          "error-content": "#100201",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "2rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "4rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },

  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
