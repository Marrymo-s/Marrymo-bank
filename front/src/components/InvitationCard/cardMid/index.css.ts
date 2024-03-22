import {defaultWrapper, flex} from '@/styles/common.css';
import { contentWrapper } from '@/styles/wrapper.css';
import { vars } from '@/styles/vars.css';
import {style} from '@vanilla-extract/css';
import account from '@/containers/account';

export const cardMidWrapper = style([
  {
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: '80px',
  },
])

export const cardMidText = style([
  {
    width: 'auto',
    maxWidth: 480,
    position: 'relative',
    fontSize: vars.fontSize['1.5x'],
  },

])

export const cardMidFamilyText = style({
  fontSize: vars.fontSize['2x'],
  fontWeight: vars.fontWeight.accent
})

export const cardMidContactWrapper = style({
  paddingTop: '40px',
})

export const cardMidContactText = style({
  fontSize: vars.fontSize['2x'],

})