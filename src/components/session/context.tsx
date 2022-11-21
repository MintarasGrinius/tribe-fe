import { createContext, Dispatch } from 'react'
import { ActionTypes } from './types'

export const initialState: State = {
  loggedIn: false,
  email: '',
}

export type State = {
  loggedIn: boolean
  email: string
}

export type DispatchType = Dispatch<{
  type: ActionTypes
  [key: string]: unknown
}>

const SessionContext = createContext<{
  sessionState: State
  sessionDispatch: DispatchType
}>({
  sessionState: initialState,
  sessionDispatch: () => {
    return
  },
})

export { SessionContext }
