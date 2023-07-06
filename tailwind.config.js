function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        "primary-opacity": withOpacity("--bg-primary-opacity"),
        secondary: "var(--bg-secondary)",
        accent: withOpacity("--accent-color"),
        "accent-hover": withOpacity("--accent-color-hover"),
        "accent-faded": "var(--accent-color-faded)",
        muted: "var(--font-muted)",
        placeholder: "var(--font-placeholder)",
        "app-primary": "var(--app-primary)",
        "app-secondary": "var(--app-secondary)",
        "app-border": "var(--app-border)",
        "app-text-primary": "var(--app-text-primary)",
        "app-text-muted": "var(--app-text-muted)",
      },
      textColor: {
        primary: "var(--font-primary)",
        muted: "var(--font-muted)",
        placeholder: "var(--font-placeholder)",
        inverted: "var(--font-inverted)",
        accent: withOpacity("--accent-color"),
        "accent-hover": withOpacity("--accent-color-hover"),
      },
      borderColor: {
        primary: "var(--border-primary)",
        "primary-hover": "var(--border-primary-hover)",
        muted: "var(--border-muted)",
        accent: withOpacity("--accent-color"),
        "accent-faded": "var(--accent-color-faded)",
        transparent: "transparent",
      },
      gradientColorStops: {
        "accent-primary": "var(--accent-primary)",
        "accent-secondary": "var(--accent-secondary)",
      },
      borderWidth: {
        sm: "1px",
        md: "2px",
      },
    },
  },
  plugins: [],
};
