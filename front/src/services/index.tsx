export const fetchInstance = async (url: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  //header, credentials
  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  }

  const response = await fetch(`${baseUrl}${url}`, defaultOptions)

  //응답 json으로 파싱
  return response.json()
}
