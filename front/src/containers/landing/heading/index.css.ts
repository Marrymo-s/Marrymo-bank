import { style } from '@vanilla-extract/css';

export const heading = style({
  fontSize: '3vw', // 뷰포트의 너비에 상대적인 폰트 크기

  // 최소 폰트 크기를 설정하여 너무 작아지는 것을 방지
  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: '1.5rem', // 큰 화면에서는 더 큰 폰트 크기를 사용
    },
    'screen and (max-width: 767px)': {
      fontSize: '1rem', // 중간 크기의 화면에서는 중간 크기의 폰트를 사용
    },
    'screen and (max-width: 480px)': {
      fontSize: '0.7rem', // 작은 화면에서는 작은 폰트 크기를 사용
    },
  },
});
