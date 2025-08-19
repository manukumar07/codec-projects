
export default {
    content: [
        "./src/**/*.{ts,js,jsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                poppins: ["Poppins", "system-ui", "-apple-system", "sans-serif"],
                inter: ["Inter", "system-ui", "-apple-system", "sans-serif"],
            },
            colors: {
                border: "#E5E7EB",
                input: "#F3F4F6",
                ring: "#2563EB",
                background: "#FFFFFF",
                foreground: "#111827",

                primary: {
                    DEFAULT: "#2563EB",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#6B7280",
                    foreground: "#FFFFFF",
                },
                destructive: {
                    DEFAULT: "#DC2626",
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "#9CA3AF",
                    foreground: "#111827",
                },
                accent: {
                    DEFAULT: "#10B981",
                    foreground: "#FFFFFF",
                },
                popover: {
                    DEFAULT: "#F9FAFB",
                    foreground: "#111827",
                },
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#111827",
                },
                sidebar: {
                    DEFAULT: "#1F2937",
                    foreground: "#F9FAFB",
                    primary: "#2563EB",
                    "primary-foreground": "#FFFFFF",
                    accent: "#10B981",
                    "accent-foreground": "#FFFFFF",
                    border: "#374151",
                    ring: "#3B82F6",
                },
                weather: {
                    "temp-hot": "#DC2626",
                    "temp-warm": "#F59E0B",
                    "temp-mild": "#10B981",
                    "temp-cool": "#3B82F6",
                    "temp-cold": "#1E3A8A",
                },
            },
            borderRadius: {
                lg: "0.75rem",
                md: "0.5rem",
                sm: "0.25rem",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },

        },

    },
    plugins: [],
}
