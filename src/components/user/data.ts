import Axios from 'axios'

import { User } from './types'
import { authHeaders, backURL } from './env'

export const initialUser: User = {
  showPreview: false,
  loggedIn: false,
  email: '',
}

export const getUser = async (): Promise<User> => {
  const authHeader = await authHeaders()
  try {
    const response = await Axios.get(backURL('api/v1/users/user_data'), {
      withCredentials: true,
      headers: { ...authHeader },
    })

    if (response.status != 200) {
      return { loggedIn: false, showPreview: false, email: '' }
    }

    return {
      showPreview: response.data.show_preview,
      email: response.data.user.email,
      loggedIn: true,
    }
  } catch (error) {
    return { loggedIn: false, showPreview: false, email: '' }
  }
}
