// Design Tokens for OmoOniBag
// Brand DNA: "A bag for every girl, every time." Luxury without clutter.

export const colors = {
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
  accent: '#C7A955',
  destructive: '#DC2626',
  border: '#D9D9D9',
  input: '#D9D9D9',
  ring: '#C7A955',
} as const;

export const typography = {
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
} as const;

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
} as const;

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

export const motion = {
  duration: {
    fast: '200ms',
    normal: '250ms',
    slow: '300ms',
  },
  easing: {
    smooth: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
    ease: 'ease-in-out',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const grid = {
  container: {
    maxWidth: '1320px',
    padding: '0 16px',
  },
  columns: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
} as const;

