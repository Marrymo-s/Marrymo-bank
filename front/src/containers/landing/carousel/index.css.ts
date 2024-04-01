import { keyframes,style } from '@vanilla-extract/css';

import { vars } from '@/styles/vars.css';

const slideInLeftAnimation = keyframes({
  'from': {
    transform: 'translateX(100%)', // 오른쪽에서 시작
  },
  'to': {
    transform: 'translateX(0)', // 왼쪽으로 이동하여 원래 위치로
  },
});

const float = keyframes({
  '0%': {
    transform: 'translateY(0px)',
  },
  '50%': {
    transform: 'translateY(-20px)',
  },
  '100%': {
    transform: 'translateY(0px)',
  },
});

export const heart = style({
  position: 'absolute',
  top: '15%',
  left: '48%',
  transform: 'translate(-50%, -50%)',
  fontSize: '30px', // Adjust size as needed
  color: 'red',
  animation: `${float} 2s ease-in-out infinite`,
});

export const carouselWrapper = style({
  // 기본 스타일
  width: '100%',
  height: '65vh',
  maxHeight: '600px',
  position: 'relative',
  aspectRatio: '16 / 9', // 이미지 비율 유지 // 근데 주석처리해도 차이가 없음
  // 미디어 쿼리를 사용한 반응형 디자인
  overflow: 'hidden',

});

export const carouselStyle = style({
  position: 'absolute', // 컨테이너 내에서 자유롭게 배치
  top: 0,
  left: 0,
  width: '100%', // 부모 컨테이너의 너비를 100% 채움
  height: '100%', // 부모 컨테이너의 높이를 100% 채움
  objectFit: 'cover', // 컨테이너에 맞게 이미지 비율을 유지하며 채움
  animation: `${slideInLeftAnimation} 1s ease-in-out`,
})