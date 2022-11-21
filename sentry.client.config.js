import * as Sentry from '@sentry/nextjs'
import { GetEnv } from './src/utils/env'

const appEnv = GetEnv()

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment:
      appEnv == 'staging' ? `${appEnv}-${process.env.STAGING_ID}` : appEnv,
    beforeSend: (event, hint) => {
      if (hint.originalException === 'Timeout') return null
      return event
    },
  })
}
