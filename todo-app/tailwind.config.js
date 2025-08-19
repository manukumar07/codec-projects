export default {
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: { '2xl': '1400px' }
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
            },
            colors: {
                border: '#E5E7EB',
                input: '#F3F4F6',
                ring: '#D1D5DB',
                background: '#FFFFFF',
                foreground: '#111827',
                primary: '#F97316',      // Orange
                secondary: '#3B82F6',    // Blue
                destructive: '#EF4444',  // Red
                success: '#10B981',      // Green
                warning: '#F59E0B',      // Amber
                muted: '#6B7280',        // Gray
                accent: '#8B5CF6',       // Purple
                popover: '#F9FAFB',
                card: '#FFFFFF',
                sidebar: '#F3F4F6',
                priority: {
                    high: '#EF4444',
                    medium: '#FBBF24',
                    low: '#10B981'
                }
            },
            borderRadius: {
                lg: '8px',
                md: '6px',
                sm: '4px'
            },
            keyframes: {
                'accordion-down': { from: { height: '0', opacity: '0' }, to: { height: 'var(--radix-accordion-content-height)', opacity: '1' } },
                'accordion-up': { from: { height: 'var(--radix-accordion-content-height)', opacity: '1' }, to: { height: '0', opacity: '0' } },
                'fade-in': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                'fade-out': { '0%': { opacity: '1', transform: 'translateY(0)' }, '100%': { opacity: '0', transform: 'translateY(-10px)' } },
                'scale-in': { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
                'slide-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                'bounce-in': { '0%': { opacity: '0', transform: 'scale(0.3)' }, '50%': { opacity: '1', transform: 'scale(1.05)' }, '70%': { transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'fade-out': 'fade-out 0.3s ease-out',
                'scale-in': 'scale-in 0.2s ease-out',
                'slide-up': 'slide-up 0.4s ease-out',
                'bounce-in': 'bounce-in 0.6s ease-out'
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(90deg, #F97316, #F59E0B)',
                'gradient-card': 'linear-gradient(90deg, #FFFFFF, #F3F4F6)',
                'gradient-surface': 'linear-gradient(90deg, #F9FAFB, #E5E7EB)'
            },
            boxShadow: {
                'elegant': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                'card': '0 1px 3px rgba(0,0,0,0.1)',
                'hover': '0 4px 6px rgba(0,0,0,0.1)'
            }
        }
    },
    plugins: []
};
