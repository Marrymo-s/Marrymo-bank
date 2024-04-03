import {style} from '@vanilla-extract/css';

import {vars} from '@/styles/vars.css';

export const kakaoLoginImage = style({
  position: 'sticky',
  width: '83%',
  maxWidth: 400,
  height: 'auto',
  top: '90dvh',
  marginTop: vars.space['5x'],
  marginBottom: vars.space['5x'],
  cursor: 'pointer',
});