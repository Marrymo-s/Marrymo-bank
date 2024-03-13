'use client';

import Image from 'next/image';
import Link from 'next/link';

import * as styles from './index.css';

import KakaoLoginButton from '@/containers/landing/KakaoLoginButton';
import Carousel from '@/containers/landing/carousel';
import Heading from '@/containers/landing/heading';


const Landing = () => {
  return (
    <main className={styles.landingWrapper}>
      <Heading />
      <Carousel />
      <KakaoLoginButton />
    </main>
  )
}

export default Landing;
