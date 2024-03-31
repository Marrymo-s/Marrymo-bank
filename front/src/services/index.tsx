export const fetchInstance = async (url: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  console.log(baseUrl)

  //header, credentials
  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  }
  try {
    const response = await fetch(`${baseUrl}${url}`, defaultOptions)
    console.log(response)

    //응답 실패시
    if (!response.ok) {
      console.error(`failed : ${response.status} ${response.statusText}`)
    }

    //응답 json으로 파싱
    return response.json()
  } catch (error) {
    //네트워크 요청 중 발생항 예외 처리
    console.error(`fetch error : ${error}`)
  }
}
