import {recipe} from '@vanilla-extract/recipes';
import {style} from '@vanilla-extract/css';

import {defaultWrapper, flex} from '@/styles/common.css';

const contentWrapperBase = style([
  defaultWrapper({
    width: 'max',
    height: 'auto',
  }),
  flex({
    align: 'center',
  }),
  {
    position: 'relative',
    boxSizing: 'border-box',
    border: 'none',
  },
])

export const contentWrapper = recipe({
  base: contentWrapperBase,

  variants: {
    contentArea: {
      header: {
        paddingTop: '80px',
      },
    },
    heightStyle: {
      max: {
        height: '100svh',
      },
    },
  }
})