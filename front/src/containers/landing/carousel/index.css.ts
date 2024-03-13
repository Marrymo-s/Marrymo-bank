import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/vars.css';

export const carouselWrapper = style({
  // 기본 스타일
  width: '100%',
  height: '65vh',
  maxHeight: '600px',

  position: 'relative',
  aspectRatio: '16 / 9', // 이미지 비율 유지

  // 미디어 쿼리를 사용한 반응형 디자인
  '@media': {
    'screen and (max-width: 768px)': {
      // height: '70vh',
      minHeight: '300px', // 최소 높이 설정
    },
    // 430px 이하의 너비를 가진 화면에 대한 미디어 쿼리
    'screen and (max-width: 430px)': {
      // height: '60vh',
      minHeight: '250px', // 430px 너비에서의 최소 높이 설정
    },
    // 최대 너비가 480px 이하인 화면
    'screen and (max-width: 480px)': {
      // height: '50vh',
      minHeight: '200px', // 최소 높이 설정
    },
  },
});