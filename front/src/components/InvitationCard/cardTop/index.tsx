import * as styles from './index.css';
import Image from 'next/image';
import React from 'react';
import { signupRequest } from '@/types/auth';

type CardTopProps = Pick<signupRequest, 'weddingDate' | 'weddingTime' | 'imgUrl' >;

const images = [
  '/images/landing/example2.png', //임시
];
const cardTop = ({ weddingDate, weddingTime, imgUrl }: CardTopProps) => {
  return (
    <div className={styles.cardTopWrapper}>
      <div className={styles.cardTopText}>
        <div>{weddingDate}</div>
        <div>{weddingTime}</div>
      </div>
      {imgUrl && ( // imgUrl이 있을 때만 이미지를 렌더링
        <div className={styles.cardTopImage}>
          <Image
            src={imgUrl}
            alt="cardTopImage"
            width={100}
            height={100}
            sizes='100vw'
          />
        </div>
      )}
    </div>
  )
}

export default cardTop;