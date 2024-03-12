'use client';

import Image from 'next/image';
import Link from 'next/link';

import * as styles from './index.css';

import KakaoLoginButton from '@/containers/landing/KakaoLoginButton';
import Carousel from '@/containers/landing/carousel';

const Landing = () => {
  return (
    <main className={styles.landingWrapper}>
      <p><b>Marrymo</b>에서</p>
      <p>우리만의 특별한 결혼식 만들기</p>
      <Carousel />
      <KakaoLoginButton />
    </main>
  )
}

export default Landing;
