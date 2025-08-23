import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				system: 'var(--font-system)',
			},
			colors: {
				background: 'hsl(var(--background))',
				'background-light': 'hsl(var(--background-light))',
				foreground: 'hsl(var(--foreground))',
				
				// Glass system
				'glass-bg': 'hsl(var(--glass-bg))',
				'glass-border': 'hsl(var(--glass-border))',
				'glass-hover': 'hsl(var(--glass-hover))',
				
				// OS colors
				'window-bg': 'hsl(var(--window-bg))',
				'window-border': 'hsl(var(--window-border))',
				'dock-bg': 'hsl(var(--dock-bg))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					glow: 'hsl(var(--primary-glow))',
					dark: 'hsl(var(--primary-dark))',
				},
				
				secondary: {
					DEFAULT: 'hsl(var(--glass-hover))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--error))',
				},
				muted: {
					DEFAULT: 'hsl(var(--glass-bg))',
				},
				accent: {
					DEFAULT: 'hsl(var(--glass-hover))',
				},
				popover: {
					DEFAULT: 'hsl(var(--glass-bg))',
				},
				card: {
					DEFAULT: 'hsl(var(--window-bg))',
				},
				border: 'hsl(var(--glass-border))',
				input: 'hsl(var(--glass-bg))',
				ring: 'hsl(var(--primary))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
