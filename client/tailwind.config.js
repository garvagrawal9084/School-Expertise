export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        background: "#f8f9ff",
        surface: "#ffffff",
        border: "#e5e7eb",
        text: "#0b1c30",
        muted: "#6b7280",
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(79, 70, 229, 0.08)",
      },
    },
  },
  plugins: [],
};