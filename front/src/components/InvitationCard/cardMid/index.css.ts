import {defaultWrapper, flex} from '@/styles/common.css';
import { contentWrapper } from '@/styles/wrapper.css';
import { vars } from '@/styles/vars.css';
import {style} from '@vanilla-extract/css';

export const cardMidWrapper = style([
  {
    textAlign: 'center',
    justifyContent: 'center',
  },
])

export const cardMidText = style([
  {
    width: 'auto',
    maxWidth: 480,
    minHeight: '10svh',
    maxHeight: '10svh',
    position: 'relative',
    fontSize: vars.fontSize['3x'],
  },

])