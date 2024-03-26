import {style} from '@vanilla-extract/css'

import {defaultWrapper} from "@/styles/common.css";
import {vars} from '@/styles/vars.css'

export const homeWrapper = style([
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

export const hanburgerButton = style({
  position: 'fixed', // 화면에 고정

})

export const hamburgerMenuTab = style({
  background: vars.colors.white, // 메뉴의 배경색
  width: '250px', // 메뉴의 너비
  height: '100vh', // 화면 높이와 동일하게 설정
  position: 'fixed', // 화면에 고정
  top: 0, // 상단 정렬
  transition: 'left 0.3s ease', // 왼쪽으로 슬라이딩하는 애니메이션
  zIndex: 2, // 다른 요소들보다 앞에 위치하도록 높은 z-index 값 설정
  overflowY: 'auto', // 내용이 많을 경우 스크롤 가능
})