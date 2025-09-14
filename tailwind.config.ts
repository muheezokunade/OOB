import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        ink: '#0B0B0B',
        coal: '#111111',
        cream: '#F6F3EE',
        fog: '#E7E3DD',
        stone: '#D9D9D9',
        gold: '#C7A955',
        
        // Semantic Colors
        background: '#F6F3EE',
        foreground: '#0B0B0B',
        muted: '#E7E3DD',
        'muted-foreground': '#6B7280',
        accent: '#C7A955',
        destructive: '#DC2626',
        border: '#D9D9D9',
        input: '#D9D9D9',
        ring: '#C7A955',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': 'clamp(44px, 6vw, 72px)',
        'display-xl': ['40px', { lineHeight: '48px' }],
        'h1': ['32px', { lineHeight: '40px' }],
        'h2': ['24px', { lineHeight: '32px' }],
        'h3': ['20px', { lineHeight: '28px' }],
        'body': ['16px', { lineHeight: '26px' }],
        'caption': ['13px', { lineHeight: '20px' }],
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0',
        wide: '0.02em',
      },
      spacing: {
        '18': '72px',
        '88': '352px',
      },
      borderRadius: {
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'elevated': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.2, 0.7, 0.2, 1)',
        'zoom-in': 'zoomIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      maxWidth: {
        'container': '1320px',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}

export default config
