import * as styles from './index.css';
import React from 'react';
import { signupRequest } from '@/types/auth';

type sentenceProps = Pick<signupRequest, 'greeting'>
// 줄 띄어쓰기랑 문장 어떻게 나눌지 나중에
const sentence = ({ greeting }: sentenceProps) => {
  console.log('greeting:',greeting)
  return (

    <div className={styles.sentenceWrapper}>
      <div>{greeting}</div>
      <div>우리의 사랑이 꽃피는 순간</div>
      <div>서로의 마음을 확인하며</div>
      <div>약속의 말을 건넵니다</div>
      <div>이 행복을 여러분과 나누고 싶어</div>
      <div>여러분을 초대합니다.</div>
      <div>이미지</div>
    </div>
  )
}

export default sentence;
