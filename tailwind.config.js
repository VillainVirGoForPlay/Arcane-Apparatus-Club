/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    // ปิดการรีเซ็ต CSS ของ Tailwind เพื่อไม่ให้ตีกับ Material UI
    preflight: false,
  },
  plugins: [],
};
