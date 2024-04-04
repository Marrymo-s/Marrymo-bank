import * as styles from './index.css';
import React from 'react';

import {signupRequest} from '@/types/auth';
import formatDateTime from '@/utils/formatdatetime';
import {KakaoMap} from '@/components/InvitationCard/location/kakao';


type locationProps = Pick<signupRequest, 'weddingDate' | 'weddingTime' | 'location'>


const weddingLocation = ({weddingDate, weddingTime, location}: locationProps) => {
  const formattedDate = formatDateTime(weddingDate, weddingTime);

  return (
    <div className={styles.locationWrapper}>
      <div className={styles.locationFirstText}>Location</div>
      <div className={styles.locationRawText}>오시는 길</div>
      <div>{formattedDate}</div>
      <div>{location}</div>
      <br />
      <div className={styles.mapContainer}>
        <KakaoMap searchKeyword={location} />
      </div>
    </div>
  );
};

export default weddingLocation;