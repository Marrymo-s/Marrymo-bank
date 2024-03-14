import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';

import { flex } from '@/styles/common.css';
import { contentWrapper } from '@/styles/wrapper.css';
import { vars } from '@/styles/vars.css';

export const invitationContainer = style({
  background: vars.colors.lightYellow,
  width: 'auto',
  maxWidth: 480,
  minHeight: '75svh',
  top: 80,
  position: 'relative',
  boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,

});
