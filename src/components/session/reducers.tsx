import { destroySession } from '../user/sessions'
import { State } from './context'
import { ActionTypes } from './types'

type Action = {
  type: ActionTypes
  loggedIn?: boolean
  email?: string
}

const reducer = (state: State, action: Action): State => {
  if (action.type === 'SET_LOGGED_IN') {
    if (typeof action.loggedIn === 'boolean') {
      if (!action.loggedIn) {
        destroySession()
        if (window.location.pathname !== '/') {
          window.location.href = '/'
        }
      }

      return {
        ...state,
        email: action?.email || '',
        loggedIn: action.loggedIn,
      }
    }
  }
  return state
}

export default reducer
