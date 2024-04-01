'use client';

import * as styles from './index.css';

import {useRouter} from 'next/navigation';
import Button from '@/components/Button';
import {getSender} from '@/store/sender';
import Image from 'next/image';


const Complete = () => {
  const router = useRouter();

  const sender = getSender();
  const routeToHome = () => {
    // TODO: Home 진입 시 비회원일 경우 userCode useParams로 local storage에 담고 push 경로 수정
    router.push(`/`);
  };

  const routeToLanding = () => {
    router.push(`/`);
  };

  return (
    <>
      <main className={styles.completeWrapper}>
        <div className={styles.completeText({contentType: 'content'})}>{sender}님</div>
        <div className={styles.thankWrapper}>
          <Image
            src="/images/complete/bubicon.jpg"
            alt="Thank you for sending"
            width={480}
            height={480}
            layout="fixed"
          />
          <div className={styles.heart}>&#10084;&#65039;</div>
        </div>
        <div className={styles.completeText({contentType: 'content'})}>
          행복한 순간에 함께 해주셔서 <br /> 감사합니다.
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            onClick={routeToHome}
            colorStyle={'roseGold'}
            filled={true}
            size="large"
          >
            홈으로 돌아가기
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            onClick={routeToLanding}
            colorStyle={'roseGold'}
            filled={true}
            size="large"
          >
            Marrymo 서비스 이용해보기
          </Button>
        </div>
      </main>
    </>
  );
};

export default Complete;
