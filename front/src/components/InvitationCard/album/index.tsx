'use client'

import * as styles from './index.css';
import React from 'react';
import { signupRequest } from '@/types/auth';
import Image from 'next/image';


type albumProps = Pick<signupRequest, 'imgUrl' >

const album = ({ imgUrl }:albumProps ) => {
  return (
    <div className={styles.albumWrapper}>
      <div className={styles.albumText}>Gallery</div>
      <div className={styles.albumPhotoBook}>
        {imgUrl.map((item:string, index:number) => (
          <div key={index} className={styles.imageContainer}>
          <Image
            src={item}
            key={index}
            alt="ablumImage"
            width={200}
            height={200}
            sizes="100vw"
          />
          </div>
        ))}
      </div>
    </div>
        )
      }

export default album;
