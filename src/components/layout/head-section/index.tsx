import Head from 'next/head'
import { useRouter } from 'next/router'
import theme from '@/utils/theme'

interface Props {
  title?: string
  description?: string
}

const HeadSection: React.FC<Props> = ({ title, description }: Props) => {
  const router = useRouter()
  const isGCPage = router.pathname.match(/.*(gift-cards).*/) ? true : false

  /* Move to utils */
  const localizedPath = (locale: string): string => {
    const { asPath, defaultLocale, query } = router
    const localePath = locale == defaultLocale ? '' : `/${locale}`
    const clearedPath = asPath.split('?')[0].split('#')[0]
    const path = asPath == '/' ? localePath : `${localePath}${clearedPath}`
    const pageQuery = query.page ? `?page=${query.page}` : ''
    return path + pageQuery
  }

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        name="viewport"
      />
      {description && <meta content={description} name="description" />}

      <title>{title || 'CoinGate'}</title>

      <meta content="CoinGate" name="application-name" />

      {/* Theme Color for Chrome, Firefox OS and Opera */}
      <meta content={theme.palette.primary.main} name="theme-color" />

      {/* Enable standalone (full-screen) mode */}
      <meta content="yes" name="mobile-web-app-capable" />

      {/* iOS */}
      <meta content="CoinGate" name="apple-mobile-web-app-title" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="default" name="apple-mobile-web-app-status-bar-style" />

      {/* Windows */}
      <meta
        content={theme.palette.primary.main}
        name="msapplication-navbutton-color"
      />
      <meta
        content={theme.palette.primary.main}
        name="msapplication-TileColor"
      />
      <meta
        content="/icons/ms-icon-144x144.png"
        name="msapplication-TileImage"
      />
      <meta content="/browserconfig.xml" name="msapplication-config" />
      <meta content="CoinGate" name="msapplication-tooltip" />
      <meta content="/" name="msapplication-starturl" />
      <meta content="no" name="msapplication-tap-highlight" />

      {/* UC Mobile Browser */}
      <meta content="yes" name="full-screen" />
      <meta content="application" name="browsermode" />
      <meta content="disable" name="nightmode" />
      <meta content="fitscreen" name="layoutmode" />
      {/* UC browser will display images even if in "text mode" */}
      <meta content="force" name="imagemode" />
      <meta content="portrait" name="screen-orientation" />

      <meta
        content="T8wKcQd4MMtJgoYXz7y2idHJNYNotVU_9U85jkiMIyE"
        name="google-site-verification"
      />
      {/* Main Link Tags */}
      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      {/* <link href="/favicon-48x48.png" rel="icon" type="image/png" sizes="48x48"/> */}

      {/* iOS */}
      <link href="/icons/apple-touch-icon.png" rel="apple-touch-icon" />
      <link href="/icons/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
      <link href="/icons/icon-96x96.png" rel="apple-touch-icon" sizes="96x96" />
      <link href="/icons/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
      <link
        href="/icons/icon-128x128.png"
        rel="apple-touch-icon"
        sizes="128x128"
      />
      <link
        href="/icons/icon-152x152.png"
        rel="apple-touch-icon"
        sizes="152x152"
      />

      {/* Startup Image */}
      {/* <link href="touch-icon-start-up-320x480.png" rel="apple-touch-startup-image" /> */}

      {/* Pinned Tab */}
      <link
        color={theme.palette.primary.main}
        href="/icons/safari-pinned-tab.svg"
        rel="mask-icon"
      />

      {/* Android */}
      <link href="/icons/icon-192x192.png" rel="icon" sizes="192x192" />
      <link href="/icons/icon-128x128.png" rel="icon" sizes="128x128" />

      {/* Others */}
      <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />

      {/* UC Browser */}
      {/* <link href="images/icon-52x52.png" rel="apple-touch-icon-precomposed" sizes="57x57"> */}
      <link href="/icons/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />

      <link href="/manifest.json" rel="manifest" />
    </Head>
  )
}

export default HeadSection
