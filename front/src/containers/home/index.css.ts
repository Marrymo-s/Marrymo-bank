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