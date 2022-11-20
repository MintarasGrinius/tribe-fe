import { backURL } from './env'
import { UserResponse } from './requests'
import { authHeaders } from './env'
import axios from 'axios'

import { User } from './types'

export const initialUser: User = {
  showPreview: false,
  loggedIn: false,
}

export const getUser = async (): Promise<User> => {
  const authHeader = await authHeaders()

  try {
    const response = await axios.get(backURL('api/v1/users/user_data'), {
      headers: { ...authHeader },
    })

    if (response.status != 200) {
      return { loggedIn: false, showPreview: false }
    }

    return {
      showPreview: response.data.show_preview,
      loggedIn: true,
    }
  } catch (error) {
    return { loggedIn: false, showPreview: false }
  }
}
