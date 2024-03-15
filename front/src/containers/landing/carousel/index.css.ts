import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/vars.css';

export const carouselWrapper = style({
  // 기본 스타일
  width: '100%',
  height: '65vh',
  maxHeight: '600px',
  position: 'relative',
  aspectRatio: '16 / 9', // 이미지 비율 유지 // 근데 주석처리해도 차이가 없음
  // 미디어 쿼리를 사용한 반응형 디자인

});

export const carouselStyle = style({
  position: 'absolute', // 컨테이너 내에서 자유롭게 배치
  top: 0,
  left: 0,
  width: '100%', // 부모 컨테이너의 너비를 100% 채움
  height: '100%', // 부모 컨테이너의 높이를 100% 채움
  objectFit: 'cover', // 컨테이너에 맞게 이미지 비율을 유지하며 채움
})