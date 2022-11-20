import { getSession } from './sessions'
export const STAGE_URL = 'http://localhost:3000/'

export const backURL = (path: string): string => {
  return `${STAGE_URL}${path}`
}

export const authHeaders = async (): Promise<{
  'X-User-Token': string
  'X-User-Email': string
}> => {
  const session = await getSession()
  console.log(session)

  return {
    'X-User-Token': session?.token || '',
    'X-User-Email': session?.email || '',
  }
}
