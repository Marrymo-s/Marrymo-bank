import {style} from '@vanilla-extract/css';
import {vars} from '@/styles/vars.css';

export const rightsText = style({
  textAlign: 'center',
  justifyContent: 'center',
  fontSize: vars.fontSize['2x'],
  color: vars.colors.lightGray,
  paddingTop: '40px',
})