import {KakaoMapResponse} from '@/types/kakaoMap';

export const getKakaoMap = async (keyword: string): Promise<KakaoMapResponse | undefined> => {
  if (!keyword.trim()) return undefined;

  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAOAPI_KEY;
  const KAKAO_MAP_SEARCH_URL = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`;

  try {
    const response = await fetch(KAKAO_MAP_SEARCH_URL, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Kakao Map API 호출 실패\n 응답 상태: ${response.status}\n 응답 메시지: ${response.statusText}`);
    }

    const data: KakaoMapResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error during Kakao Map search:', error);
    return undefined;
  }
};
