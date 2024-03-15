import { flex } from '@/styles/common.css';
import { contentWrapper } from '@/styles/wrapper.css';
import { vars } from '@/styles/vars.css';
import {style} from '@vanilla-extract/css';

export const cardTopText = style({
  width: 'auto',
  maxWidth: 480,
  minHeight: '10svh',
  maxHeight: '10svh',
  position: 'relative',
  boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,

})

// 참고용으로 복붙해서 가져온거
export const invitationContainer = style({
  background: vars.colors.lightYellow,
  width: 'auto',
  maxWidth: 480,
  minHeight: '75svh',
  maxHeight: '75svh',
  top: 80,
  position: 'relative',
  boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,
  overflow: 'auto',
});