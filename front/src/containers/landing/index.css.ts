import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/vars.css';
import { defaultWrapper, flex } from '@/styles/common.css';

export const landingWrapper = style([
  defaultWrapper({ height: 'auto', width: 'max' }),
    {
      textAlign: 'center',
    }
]);



