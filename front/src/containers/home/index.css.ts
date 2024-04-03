import {keyframes, style} from '@vanilla-extract/css';

import {defaultWrapper, flex} from '@/styles/common.css';
import {vars} from '@/styles/vars.css';

export const homeWrapper = style([
  // TODO: 토큰 담아서 Wrapper noHeader 스타일로 적용시키기
  defaultWrapper({height: 'max'}),
  {
    maxWidth: '480px',
    backgroundColor: vars.colors.lightYellow,
    textAlign: 'center',
    overflow: 'hidden',
  },
]);

// 햄버거바 열림
const slideInFromLeft = keyframes({
  'from': {
    transform: 'translateX(-20%)',
  },
  'to': {
    transform: 'translateX(0)',
  },
});

// 햄버거바 닫힘
const slideOutToLeft = keyframes({
  'from': {
    transform: 'translateX(0)',
  },
  'to': {
    transform: 'translateX(-20%)',
  },
});

export const invitationContainer = style({
  background: vars.colors.lightYellow,
  width: 'auto',
  maxWidth: 480,
  height: '100%',
  position: 'relative',
  marginBottom: vars.space['4x'],
  boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,
  overflow: 'auto',
});

export const hamburgerButton = style({
  position: 'absolute',
  zIndex: 2,
  top: vars.space['3x'],
  left: vars.space['3x'],
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  '@media': {
    'screen and (min-width: 480px)': {
      left: vars.space['3x'],
    },
  },
});

export const hamburgerMenuTab = style({
  background: vars.colors.white, // 메뉴의 배경색
  width: '320px', // 메뉴의 너비
  height: '100vh', // 화면 높이와 동일하게 설정
  position: 'fixed',
  top: 0,
  transition: 'transform 3s ease', // 왼쪽으로 슬라이딩하는 애니메이션
  zIndex: 2, // 다른 요소들보다 앞에 위치하도록 높은 z-index 값 설정
  overflowY: 'auto', // 내용이 많을 경우 스크롤 가능
  transform: 'translateX(-100%)',
  '@media': {
    'screen and (min-width: 480px)': {
      width: '320px', // 메뉴의 너비를 320px로 설정
      transform: 'translateX(0)', // 화면 너비가 480px 이상일 때 메뉴가 보이도록 설정
    },
  },
});

export const hamburgerMenuTabActive = style({
  animation: `${slideInFromLeft} 0.3s ease-out forwards`,
});

export const hamburgerMenuTabInactive = style({
  animation: `${slideOutToLeft} 0.3s ease-out forwards`,
});

export const hamburgerListContent = style([
  flex({justify: 'spaceBetween', align: 'center', direction: 'row'}),
  {
    padding: vars.space['2x'],
    color: 'black',
    width: `calc(100% - 2 * ${vars.space['2x']})`,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecorationLine: 'none',
  },
]);

export const hamburgerBarSeperateLine = style({
  border: `1px solid ${vars.colors.lightGray}`,
  width: '100%',
});

export const logoutModalWrapper = style([
  flex({justify: 'center'}),
  {
    alignItems: 'center',
    marginTop: '320px',
  },
]);

export const closeButton = style({
  position: 'absolute',
  top: vars.space['2x'],
  right: vars.space['2x'],
  background: 'transparent',
  border: 'none',
  cursor: 'pointer', // 마우스 오버 시 커서를 포인터로 변경합니다.
});

export const greeting = style({
  flex: '1 1 auto',
  textAlign: 'left',
  paddingRight: vars.space['3x'],
  fontSize: vars.space['3x'],
});

export const copyButton = style({
  position: 'absolute',
  right: vars.space['3x'],
  top: '50%',
  transform: 'translateY(-50%)',
  alignItems: 'flex-end',
  // marginRight: vars.space['3x'],
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

export const menuHeader = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: vars.space['2x'],
  height: '120px',
});

export const contactText = style({
  position: 'absolute',
  fontSize: vars.space['1.5x'],
  width: '100%',
  color: vars.colors.gray,
  bottom: vars.space['3x'],
  textAlign: 'center',
});

export const copyContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const copyText = style({
  fontSize: vars.space['1.5x'],
  color: vars.colors.gray,
});

export const NonLoginHomeWrapper = style([
  // TODO: 토큰 담아서 Wrapper noHeader 스타일로 적용시키기
  defaultWrapper({height: 'max'}),
  {
    maxWidth: '480px',
    backgroundColor: vars.colors.white,
    textAlign: 'center',
    overflow: 'hidden',
  },
]);

export const NonLoginInvitationContainer = style({
  background: vars.colors.lightYellow,
  width: 'auto',
  maxWidth: 480,
  height: '85%',
  position: 'relative',
  marginBottom: vars.space['4x'],
  boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,
  overflow: 'auto',
});

export const homeButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})