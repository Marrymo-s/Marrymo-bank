import {style} from '@vanilla-extract/css';
import {recipe} from '@vanilla-extract/recipes';
import {calc} from '@vanilla-extract/css-utils';

import {flex} from '@/styles/common.css';
import {contentWrapper} from '@/styles/wrapper.css';
import {vars} from '@/styles/vars.css';


export const progressTotalContainer = style({

  width: '300px',
  height: '30px',
  borderColor: vars.colors.black,
  borderWidth: '1px',
  borderStyle: 'solid',
  overflow: 'hidden',
})

export const progressPartialContainer = style({
  background: vars.colors.roseGold,
  height: '100%',
})