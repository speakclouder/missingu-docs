import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "missing:u docs",
  description: "Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Start', link: '/quick-start' },
      { text: 'Pricing', link: '/pricing' },
    ],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Quick start', link: '/quick-start' },
        ]
      },
      {
        text: 'What?',
        items: [
          { text: 'Plan', link: '/plan' },
          { text: 'Pricing', link: '/pricing' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
