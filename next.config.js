const { withSentryConfig } = require('@sentry/nextjs')
const withPlugins = require('next-compose-plugins')
const sourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const SENTRY_DSN = process.env.SENTRY_DSN
const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN

const appEnv = () => {
  return 'development'
}

module.exports = (phase, { defaultConfig }) => {
  const APP_ENV = appEnv()

  const pluginsList = [[sourceMaps], [withBundleAnalyzer]]

  if (SENTRY_AUTH_TOKEN && SENTRY_DSN) {
    pluginsList.push([withSentryConfig])
  }

  return withPlugins(pluginsList, {
    async headers() {
      return [
        {
          source:
            '/:slug*.(jpg|jpeg|gif|png|svg|woff|woff2|eot|ttf|otf|js|css)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'max-age=31536000',
            },
          ],
        },
        {
          source: '/:slug*',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
          ],
        },
        {
          source: '/sw.js',
          headers: [{ key: 'Cache-Control', value: 'no-cache' }],
        },
      ]
    },
    swcMinify: true,
    env: {
      APP_ENV,
    },
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
    },
  })(phase, { defaultConfig })
}
