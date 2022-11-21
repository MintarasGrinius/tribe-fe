const fs = require('fs')
const globby = require('globby')

const generateSitemap = async () => {
  try {
    const pages = await globby([
      'src/pages/**/*.tsx',
      'src/pages/index.tsx',
      '!src/pages/_*.tsx',
      '!src/pages/404.tsx',
      '!src/pages/500.tsx',
      '!src/pages/logout.tsx',
      '!src/pages/resend.tsx',
      '!src/pages/reset.tsx',
      '!src/pages/newsroom.tsx',
      '!src/pages/api',
      '!src/pages/**/[*',
      '!src/pages/reset/*.tsx',
      '!src/pages/gift-cards/checkout/**',
    ])

    const mappedPages = pages.map((page) =>
      page.replace('src/pages', '').replace('.tsx', '').replace('/index', '')
    )

    const filteredPages = mappedPages.filter(
      (page) => !['/trade'].includes(page)
    )

    fs.writeFileSync(
      'public/sitemap-local-files.json',
      JSON.stringify(filteredPages)
    )
  } catch (e) {
    console.log(e)
  }
}

module.exports = generateSitemap
