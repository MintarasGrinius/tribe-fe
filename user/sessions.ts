// import * as SecureStore from 'expo-secure-store'

const SESSION_KEY = 'event_app_session'

type Session = { token: string; email: string }

export const saveSession = (session: Session): Promise<void> => {
  return new Promise((resolve, reject) => {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))

    return resolve()
  })
}

export const getSession = async (): Promise<Session | null> => {
  const session = window?.localStorage?.getItem(SESSION_KEY)
  if (session) {
    return JSON.parse(session)
  } else {
    return null
  }
}

export const destroySession = (): void => {
  window.localStorage.removeItem(SESSION_KEY)
}
