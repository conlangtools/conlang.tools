import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'sans': ['Fira Sans', ...defaultTheme.fontFamily.sans],
      'mono': ['Fira Code', 'Fira Mono', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      'transparent': 'transparent',
      'primary': 'var(--c-primary)',
      'secondary': 'var(--c-secondary)',
      'alt': 'var(--c-alt)',
      'border': 'var(--c-border)',
      'fg-primary': 'var(--c-fg-primary)',
      'fg-secondary': 'var(--c-fg-secondary)',
      'fg-emphasis': 'var(--c-fg-emphasis)',
      'fg-alt': 'var(--c-fg-alt)',
      'accent': 'var(--c-accent)',
      'analogue': 'var(--c-analogue)',
      'complement': 'var(--c-complement)',
      'info': 'var(--c-info)',
      'success': 'var(--c-success)',
      'warn': 'var(--c-warn)',
      'error': 'var(--c-error)',
      'yellow': 'var(--c-yellow)',
      'orange': 'var(--c-orange)',
      'red': 'var(--c-red)',
      'pink': 'var(--c-pink)',
      'purple': 'var(--c-purple)',
      'blue': 'var(--c-blue)',
      'cyan': 'var(--c-cyan)',
      'green': 'var(--c-green)',
      'blurple': 'var(--c-blurple)',
    },
  },
  plugins: [],
}

