import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/vars.css';
import { defaultWrapper, flex} from '@/styles/common.css';
import {style} from '@vanilla-extract/css';

export const resultsContainer = style([
  flex({ align: 'center', direction: 'column', justify: 'center' }),
  {
    alignItems: 'center',
    justifyContent: 'center',

  },
  {

    display:'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: vars.space['1x'],
    width: 'auto',
    maxWidth: 480,
    minHeight: '75dvh',
    maxHeight: '75dvh',
    position: 'relative',
    overflow: 'auto',
  }
])
