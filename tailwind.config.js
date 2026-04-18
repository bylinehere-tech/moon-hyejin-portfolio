/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Chemiflow brand palette — Ivory Cream base (light theme)
        'bg-primary':    '#F4EDE1',  // Ivory Cream (brand)
        'bg-secondary':  '#EAE0CD',  // warm cream — cards
        'bg-tertiary':   '#E0D3B9',  // darker cream — hover / inputs
        'text-primary':  '#2D2447',  // Deep Plum (brand) — main text
        'text-secondary':'#6B5A96',  // Lavender Deep — muted text
        'accent':        '#6B5A96',  // Lavender Deep — primary interactive
        'accent-hover':  '#2D2447',  // Deep Plum — hover
        'accent-sub':    '#9A85C5',  // Lavender Primary — secondary accent
        'border-custom': '#D6C9AE',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'Apple SD Gothic Neo', 'sans-serif'],
        display:    ['DM Serif Display', 'serif'],
      },
      fontSize: {
        'hero':    ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05' }],
        'section': ['clamp(2rem, 4vw, 3rem)',  { lineHeight: '1.15' }],
      },
      spacing: {
        'section-desktop': '100px',
        'section-mobile':  '56px',
      },
    },
  },
  plugins: [],
}
