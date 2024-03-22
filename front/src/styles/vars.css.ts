import {createGlobalTheme} from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  space: {
    none: '0',
    '0.5x': '4px',
    '1x': '8px',
    '1.5x': '12px',
    '2x': '16px',
    '3x': '24px',
    '4x': '32px',
    '5x': '40px',
  },

  colors: {
    white: '#ffffff',
    black: '#000000',
    gray: '#767676', // 글씨
    lightGray: '#CDCDCD', // 안에 컨텐츠 들어가는 박스에 씀
    whitesmoke: '#f1f1f1', // 선 ex) 홈페이지 햄버거가 열었을 때 선
    roseGold: '#FFC2B9',
    alertRed: '#E8635C', // 경고문구
    lightYellow: '#FFFDEF', // 청첩장 배경
  },

  borderRadius: {
    '0x': '0px',
    '1x': '8px',
    '2x': '16px',
    '3x': '24px',
    '4x': '32px',
    '5x': '40px',
    top: '32px 32px 0 0',
    full: '9999px', // 원을 만들 때 사용
  },

  // fontFamily: {
  //   body:
  // },

  fontSize: {
    '1x': '8px',
    '1.5x': '12px', // extra small
    '2x': '16px', // small
    '2.5x': '20px',
    '3x': '24px', // medium
    '4x': '32px',
    '5x': '40px',
  },

  fontWeight: {
    normal: '400',
    accent: '700',
  },

  zIndex: {
    'alert-content': '3001',
    'alert-bg': '3000',
    'content-to-top': '2001',
    'content-bg-to-top': '2000',
    'layout-content': '1000',
    'z-5': '5',
    'z-4': '4',
    'z-3': '3',
    'z-2': '2',
    'z-1': '1',
  },
})

