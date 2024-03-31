import * as styles from './index.css';
import Image from 'next/image';
import React from 'react';
import { signupRequest } from '@/types/auth';

type SecondImageProps = Pick<signupRequest, 'imgUrl' >;

const secondImage = ( { imgUrl } : SecondImageProps) => {
  return (
    <div className={styles.secondImageWrapper}>
      <Image
        src={imgUrl}
        alt="secondImage"
        width={300}
        height={300}
        sizes='100vw'

      />
    </div>
  )
}

export default secondImage;