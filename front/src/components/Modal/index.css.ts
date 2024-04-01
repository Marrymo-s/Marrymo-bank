import {keyframes, style} from '@vanilla-extract/css';
import {recipe} from '@vanilla-extract/recipes';

import {flex, plainButton} from '@/styles/common.css';
import {vars} from '@/styles/vars.css';

export const upAnimation = keyframes({
  '0%': {bottom: '-100%'},
  '100%': {bottom: 0},
});

export const downAnimation = keyframes({
  '0%': {bottom: 0},
  '100%': {bottom: '-100%'},
});

export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: `rgba(0, 0, 0, 0.5)`,
  zIndex: vars.zIndex['content-bg-to-top'],
});

export const modalWrapper = recipe({
  base: {
    width: 'calc(100% - 64px)', // 좌우 여백을 32px씩 설정
    maxWidth: '416px', // 모달 최대 너비 설정
    height: 'auto', // 높이는 자동으로 설정
    // maxHeight: '300px',
    minHeight: '500px',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: vars.colors.white,
    borderRadius: vars.borderRadius.all,
    zIndex: vars.zIndex['content-to-top'],
    overflowY: 'auto', //
  },
  variants: {
    isUnmount: {
      true: {
        animationName: downAnimation,
      },
      false: {
        animationName: upAnimation,
      },
    },
  },
});

export const modalPadding = style({
  padding: vars.space['4x'],
});

export const closeButton = style([
  plainButton(),
  flex({align: 'right'}),
  {
    marginLeft: 'auto',
  },
]);

export const modalTitle = style({
  width: '80%',
  fontSize: vars.fontSize['3x'],
  fontWeight: vars.fontWeight.accent,
  fontFamily: 'BMJua',
  marginBottom: vars.space['3x'],
  wordBreak: 'keep-all',
});
