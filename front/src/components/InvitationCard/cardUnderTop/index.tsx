import * as styles from './index.css';
import React from 'react';
import { signupRequest } from '@/types/auth';
import formatDateTime from '@/utils/formatdatetime'


type CardUnderTopProps = Pick<signupRequest, 'groomName' | 'brideName' | 'weddingDate' | 'weddingTime' | 'location'>;

const CardUnderTop = ({
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  location
}: CardUnderTopProps) => {
  const formattedDate = formatDateTime(weddingDate, weddingTime)

  return (
    <div className={styles.cardUnderTopWrapper}>
      <div className={styles.cardUnderTopText}>
        <div>{groomName} · {brideName}</div>
        <br/>
        <div>{formattedDate}</div>
        <div>{location}</div>
      </div>
    </div>
  )
}

export default CardUnderTop;