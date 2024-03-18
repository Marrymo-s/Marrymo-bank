'use client';

import * as styles from './index.css';

import KakaoLoginButton from '@/containers/landing/KakaoLoginButton';
import Carousel from '@/containers/landing/carousel';


const Landing = () => {
  return (
    <main className={styles.landingWrapper}>
      {/*<Heading />*/}
      <div className={styles.landingText({ contentType: 'title' })}>
        Marrymo
      </div>
      <div className={styles.landingText({ contentType: 'content' })}>
        우리만의 특별한 결혼식 만들기
      </div>
      <Carousel />
      <KakaoLoginButton />
    </main>
  )
}

export default Landing;
