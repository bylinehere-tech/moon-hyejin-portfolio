/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':    '#0A0910',
        'bg-secondary':  '#13111E',
        'bg-tertiary':   '#1E1A2E',
        'text-primary':  '#F0EEFF',
        'text-secondary':'#9590AA',
        'accent':        '#9F8FD0',
        'accent-hover':  '#B5ACDF',
        'accent-sub':    '#C4899A',
        'border-custom': '#2D2940',
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
