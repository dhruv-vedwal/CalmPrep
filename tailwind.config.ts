import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          DEFAULT: 'var(--lavender)',
          mid: 'var(--lavender-mid)',
          deep: 'var(--lavender-deep)',
          text: 'var(--lavender-text)',
        },
        sage: {
          DEFAULT: 'var(--sage)',
          mid: 'var(--sage-mid)',
          deep: 'var(--sage-deep)',
          text: 'var(--sage-text)',
        },
        peach: {
          DEFAULT: 'var(--peach)',
          mid: 'var(--peach-mid)',
          deep: 'var(--peach-deep)',
          text: 'var(--peach-text)',
        },
        sky: {
          DEFAULT: 'var(--sky)',
          mid: 'var(--sky-mid)',
          deep: 'var(--sky-deep)',
        },
        white: 'var(--white)',
        offWhite: 'var(--off-white)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        textMuted: 'var(--text-muted)',
        borderLight: 'var(--border)',
        borderMed: 'var(--border-med)',
      },
      fontFamily: {
        body: ['var(--font-body)'],
        serif: ['var(--font-serif)'],
      },
      borderRadius: {
        'card': '20px',
        'btn': '12px',
      },
    },
  },
  plugins: [],
};
export default config;
