import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initialState, SessionContext } from '../Session/context'
import { useEffect, useReducer } from 'react'
import reducer from '../Session/reducers'
import { getSession } from '../user/sessions'
import { getUserData } from '../user/requests'

export default function App({ Component, pageProps }: AppProps) {
  const [sessionState, sessionDispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    getSession().then(() => {
      getUserData()
        .then(({ data }) => {
          sessionDispatch({
            type: 'SET_LOGGED_IN',
            email: data.user?.email,
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

  return (
    <SessionContext.Provider value={{ sessionState, sessionDispatch }}>
      <Component {...pageProps} />
    </SessionContext.Provider>
  )
}
