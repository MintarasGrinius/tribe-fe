import { UserData } from './types'
import axios from 'axios'
import { authHeaders, backURL } from './env'

export type PlannedEvent = {
  age_group: string
  capacity: number
  category: string
  description: string
  dress_code: string
  event_id: number
  id: number
  location: string
  own_drinks: boolean
  time: string
  title: string
  photos: string[]
}

export type UserResponse = {
  user: UserData
}

export const getEvents = async (): Promise<{ data: PlannedEvent[] }> => {
  const authHeader = await authHeaders()

  return axios.get(backURL('api/v1/events'), {
    headers: { ...authHeader },
  })
}

export const getUserData = async (): Promise<{ data: UserResponse }> => {
  const authHeader = await authHeaders()

  return axios.get(backURL('api/v1/users/user_data'), {
    headers: { ...authHeader },
  })
}
