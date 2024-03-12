'use client';

import Image from 'next/image';
import Link from 'next/link';

import KakaoLoginButton from '@/containers/landing/KakaoLoginButton';

const Landing = () => {
  return (
    <>
      <div> 랜딩 페이지</div>
      <KakaoLoginButton />
    </>
  )
}

export default Landing;
