'use client';

import { useEffect } from 'react';
import Image from 'next/image';

const KakaoLoginButton = () => {
  return (
    <Image
      src='/images/landing/button-kakao-login.png'
      alt='kakao-login-button'
      width={500}
      height={100}
      sizes='90vw'
      // className={styles.kakaoLoginImage}
      // onClick={kakaoLoginHandler}
    />
  )
}

export default KakaoLoginButton;