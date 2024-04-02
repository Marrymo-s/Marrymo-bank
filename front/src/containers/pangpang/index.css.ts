import {style} from '@vanilla-extract/css';

import {defaultWrapper, flex} from '@/styles/common.css';
import {vars} from '@/styles/vars.css';

export const homeWrapper = style([
  // TODO: 토큰 담아서 Wrapper noHeader 스타일로 적용시키기
  defaultWrapper({height: 'max'}),
  {
    backgroundColor: vars.colors.lightYellow,
    textAlign: 'center',
  },
]);

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
  position: 'relative',
  zIndex: 2,
  marginTop: vars.space['3x'],
  marginLeft: vars.space['3x'],
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  '@media': {
    'screen and (min-width: 480px)': {
      left: 'calc(480px - 100%)', // 화면 너비가 480px 이상일 때 버튼의 위치를 조정
    },
  },
});

export const hamburgerMenuTab = style({
  background: vars.colors.whitesmoke, // 메뉴의 배경색
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
  transform: 'translateX(0)',

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