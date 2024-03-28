import { defaultWrapper, flex } from '@/styles/common.css';
import { contentWrapper } from '@/styles/wrapper.css';
import { vars } from '@/styles/vars.css';
import { style } from '@vanilla-extract/css';

export const secondImageWrapper = style([
  defaultWrapper({ height: 'auto', width: 'max' }),
  {
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: '80px',
  }

])

