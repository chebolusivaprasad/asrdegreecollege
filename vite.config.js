import { defineConfig } from 'vite'

const pages = [
  'about', 'administration', 'departments', 'courses', 'admissions',
  'faculty', 'infrastructure', 'placements', 'training-internships',
  'events', 'gallery', 'notices', 'downloads', 'contact',
]

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        ...Object.fromEntries(
          pages.map((page) => [page, `pages/${page}.html`])
        ),
      },
    },
  },
})
