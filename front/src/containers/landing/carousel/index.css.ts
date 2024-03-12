import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/vars.css';

export const carouselImage = style({
  width: '100%', // 부모의 너비에 맞춤
  height: '65svh',
  maxHeight: 600,
  position: 'relative', // Image 컴포넌트의 layout="responsive"와 함께 사용
  // paddingTop: '30.25%',
  // paddingBottom: '22.25%', // 16:9 비율 유지 (예: height / width * 100)
});