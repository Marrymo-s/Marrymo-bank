import * as styles from './index.css';
import React from 'react';
import { signupRequest } from '@/types/auth';

type sentenceProps = Pick<signupRequest, 'greeting'>

const sentence = ({ greeting }: sentenceProps) => {
  return (
    // 여기 글귀를 어떻게 출력해야할지 모르겠음 ..
    <div>
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
