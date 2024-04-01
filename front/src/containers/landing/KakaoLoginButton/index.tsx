'use client';

import {useEffect} from 'react';
import Image from 'next/image';
import * as styles from './index.css';

const kakaoUrl = 'https://spring.marrymo.site/oauth2/authorization/kakao';
// env에 넣어주기
const KakaoLoginButton = () => {
  const kakaoLoginHandler = () => {
    window.location.href = kakaoUrl;
  };

  return (
    <Image
      src='/images/landing/button-kakao-login.png'
      alt='kakao-login-button'
      width={500}
      height={100}
      sizes='90vw'
      className={styles.kakaoLoginImage}
      onClick={kakaoLoginHandler}
    />
  );
};

export default KakaoLoginButton;
