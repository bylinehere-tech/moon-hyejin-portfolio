/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Chemiflow studio palette
        cream:            '#FBF8F0',
        angora:           '#DFD1BB',
        lavender:         '#AFA4CE',
        'lavender-soft':  '#C9BEE1',
        navy:             '#282D3C',
        'navy-65':        'rgba(40,45,60,0.65)',
        'navy-45':        'rgba(40,45,60,0.45)',
        'navy-12':        'rgba(40,45,60,0.12)',
        hairline:         'rgba(40,45,60,0.08)',
        blush:            '#D7B8AB',

        // Back-compat aliases (Phase C까지 기존 class 유지용)
        'bg-primary':     '#FBF8F0',
        'bg-secondary':   '#DFD1BB',
        'bg-tertiary':    '#EFE5CF',
        'text-primary':   '#282D3C',
        'text-secondary': 'rgba(40,45,60,0.65)',
        accent:           '#AFA4CE',
        'accent-hover':   '#282D3C',
        'accent-sub':     '#C9BEE1',
        'border-custom':  'rgba(40,45,60,0.08)',
      },
      fontFamily: {
        pretendard: ['"Pretendard Variable"', 'Pretendard', 'Apple SD Gothic Neo', 'system-ui', 'sans-serif'],
        display:    ['"Pretendard Variable"', 'Pretendard', 'Apple SD Gothic Neo', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display':  ['clamp(52px, 6.4vw, 92px)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'h2':       ['clamp(32px, 3.4vw, 40px)',  { lineHeight: '1.1',  letterSpacing: '-0.02em'  }],
        'deck':     ['19px',                       { lineHeight: '1.55' }],
        'eyebrow':  ['12px',                       { lineHeight: '1.4',  letterSpacing: '0.12em'  }],
        'meta-k':   ['10.5px',                     { lineHeight: '1.4',  letterSpacing: '0.10em'  }],
        // back-compat
        'hero':     ['clamp(52px, 6.4vw, 92px)',   { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'section':  ['clamp(32px, 3.4vw, 40px)',   { lineHeight: '1.1'                          }],
      },
      spacing: {
        'section-desktop': '120px',
        'section-mobile':  '96px',
      },
    },
  },
  plugins: [],
}
