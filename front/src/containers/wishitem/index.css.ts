import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';

import {defaultWrapper, flex} from '@/styles/common.css';
import { contentWrapper } from '@/styles/wrapper.css';
import { vars } from '@/styles/vars.css';

export const wishitemContainer = style([
  defaultWrapper({ height: 'auto', width: 'max' }),
  {
    alignItems: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
  },
  {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    maxWidth: 480,
    minHeight: 'auto',
    maxHeight: 'auto',
    top: 80,
    position: 'relative',
    boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,

  }
]);