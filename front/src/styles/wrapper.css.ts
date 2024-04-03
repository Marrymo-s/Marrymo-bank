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
    direction: 'column',
  }),
  {
    position: 'relative',
    boxSizing: 'border-box',
    border: 'none',
  },
]);

export const contentWrapper = recipe({
  base: contentWrapperBase,

  variants: {
    contentArea: {
      header: {
        paddingTop: '120px',
      },
      noHeader: {
        paddingTop: '40px',
      },
    },
    heightStyle: {
      max: {
        height: '100dvh',
      },
    },
  },
});