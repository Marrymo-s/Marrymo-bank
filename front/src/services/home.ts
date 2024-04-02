export const logout = async (): Promise<void> => {
  try {
    const response = await fetch('/oauth/logout/kakao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('로그아웃 성공');
    } else {
      throw new Error(`서버 응답 상태: ${response.status}`);
    }
  } catch (error) {
    console.log('로그아웃 실패:', error);
  }
};