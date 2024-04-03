import * as styles from './index.css';
import Image from 'next/image';
import React from 'react';
import { signupRequest } from '@/types/auth';
import formatDate from '@/utils/formatdate';

type CardTopProps = Pick<signupRequest, 'weddingDate' | 'weddingDay' | 'imgUrl' >;

const cardTop = ({ weddingDate, weddingDay, imgUrl }: CardTopProps) => {
  const formattedDate = formatDate(weddingDate);

  return (
    <div className={styles.cardTopWrapper}>
      <div className={styles.cardTopText}>
        <div>{formattedDate}</div>
        <div>{weddingDay}요일</div>
      </div>
      {imgUrl && ( // imgUrl이 있을 때만 이미지를 렌더링
        <div className={styles.cardTopImage}>
          <Image
            src={imgUrl}
            alt="cardTopImage"
            width={300}
            height={300}
            sizes='100vw'
          />
        </div>
      )}
    </div>
  )
}

export default cardTop;