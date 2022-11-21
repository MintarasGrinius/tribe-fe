import { useEffect, useReducer } from 'react'
import { getUser, UserContext, useUser } from '@/components/user'

import lazySizes from 'lazysizes'
import 'lazysizes/plugins/blur-up/ls.blur-up'

import '@/assets/sass/style.sass'
import reducer from '@/components/session/reducers'
import { initialState, SessionContext } from '@/components/session/context'
import { getSession } from '@/components/user/sessions'

const App = ({ Component, pageProps, err }): JSX.Element => {
  const { user } = useUser()
  const [sessionState, sessionDispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getSession().then(() => {
      getUser()
        .then(({ email }) => {
          sessionDispatch({
            type: 'SET_LOGGED_IN',
            email: email,
            loggedIn: true,
          })
        })
        .catch(() => {
          sessionDispatch({
            type: 'SET_LOGGED_IN',
            loggedIn: false,
            email: '',
          })
        })
    })
  }, [])

  useEffect(() => {
    lazySizes.init()

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      // eslint-disable-next-line
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    // Auto-redirect if current page is auth page
    console.log(window.location.pathname)

    if (window.location.pathname.match('/login') && user.loggedIn) {
      window.location.href = '/'
    }
  }, [user.loggedIn])

  return (
    <SessionContext.Provider value={{ sessionState, sessionDispatch }}>
      <UserContext.Provider value={user}>
        <Component {...pageProps} err={err} />
      </UserContext.Provider>
    </SessionContext.Provider>
  )
}

export default App
