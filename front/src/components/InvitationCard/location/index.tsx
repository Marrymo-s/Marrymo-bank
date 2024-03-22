import * as styles from './index.css';
import React from 'react';

import {signupRequest} from '@/types/auth';
import formatDateTime from '@/utils/formatdatetime';


type locationProps = Pick<signupRequest, 'weddingDate' | 'weddingTime' | 'location'>


const weddingLocation = ({weddingDate, weddingTime, location}: locationProps) => {
  const formattedDate = formatDateTime(weddingDate, weddingTime)

  return (
    <div className={styles.locationWrapper}>
      <div className={styles.locationFirstText}>Location</div>
      <div className={styles.locationRawText}>오시는 길</div>
      <div>{formattedDate}</div>
      <div>{location}</div>
      <br/>
      <div>카카오 지도</div>
    </div>
  )
}

export default weddingLocation;