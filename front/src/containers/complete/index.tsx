'use client';

import * as styles from './index.css';

import {useRouter} from 'next/navigation';
import Button from '@/components/Button';
import MarrymoLogo from '../../../public/svgs/MarrymoLogo.svg'
// import userStore from todo: Zustand에서 UserCode가져와야함.


const Complete = () => {
  const router = useRouter();

  const routeToHome = () => {
    router.push(`/`);
  }

  const routeToLanding = () => {
    router.push(`/`);
  }

  return (
    <>
      <main className={styles.landingWrapper}>
        <div className={styles.landingText({contentType: 'content'})}>
        <MarrymoLogo/>
        </div>
        <div className={styles.landingText({contentType: 'content'})}>
          행복한 순간에 함께 해주셔서 <br/> 감사합니다.
        </div>
        <Button
          type='button'
          onClick={routeToHome}
          colorStyle={'roseGold'}
          filled={true}
          size='large'
        >
          다음
        </Button>
      </main>
    </>
  );
};

export default Complete;
