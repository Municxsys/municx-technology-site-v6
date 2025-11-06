export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { tech: { bg: "#0a0f1a", cyan: "#00e0ff" } },
      boxShadow: { glass: "0 1px 0 rgba(255,255,255,0.10) inset, 0 10px 30px rgba(0,0,0,0.45)" }
    }
  },
  plugins: []
};
