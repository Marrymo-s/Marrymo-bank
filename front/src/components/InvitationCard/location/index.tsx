import * as styles from './index.css';
import React from 'react';
import { signupRequest } from '@/types/auth';

type locationProps = Pick<signupRequest, 'weddingDate' | 'weddingTime' | 'location'>
// 카카오지도는 어디서 어떻게 가져오지?

const location = ({ weddingDate, weddingTime, location}: locationProps) => {
  return (
    <div>
      <div>Location( 이건 그냥 문자열 )</div>
      <div>오시는 길 (얘도 그냥 문자열)</div>
      <div>{weddingDate} {weddingTime}</div>
      <div>{location}</div>
      <div>카카오 지도</div>
    </div>
  )
}

export default location;