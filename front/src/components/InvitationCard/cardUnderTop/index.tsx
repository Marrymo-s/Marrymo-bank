import * as styles from './index.css';
import React from 'react';
import { signupRequest } from '@/types/auth';


type CardUnderTopProps = Pick<signupRequest, 'groomName' | 'brideName' | 'weddingDate' | 'weddingTime' | 'location'>;

const CardUnderTop = ({
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  location
}: CardUnderTopProps) => {
  return (
    <div className={styles.cardUnderTopWrapper}>
      <div className={styles.cardUnderTopText}>
        <div>{groomName} · {brideName}</div>
        <br/>
        <br/>
        <div>{`${weddingDate} ${weddingTime}`}</div>
        <div>{location}</div>
      </div>
    </div>
  )
}

export default CardUnderTop;