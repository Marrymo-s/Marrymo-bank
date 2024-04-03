import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';

import {defaultWrapper, flex} from '@/styles/common.css';
import { contentWrapper } from '@/styles/wrapper.css';
import { vars } from '@/styles/vars.css';

export const search = style([
  {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
  }
])

export const searchInputBoxStyle = style({
  width: '100%',
  marginBottom: vars.space['2x'],
});