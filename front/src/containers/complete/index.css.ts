import {style} from '@vanilla-extract/css';
import {recipe} from '@vanilla-extract/recipes';

import {vars} from '@/styles/vars.css';
import {flex} from '@/styles/common.css';
import {contentWrapper} from '@/styles/wrapper.css';

export const landingWrapper = style([
  contentWrapper({contentArea: 'header'}),
  flex({
    align: 'center',
    justify: 'flexStart',
    direction: 'column',
  }),
  {
    padding: vars.space['4x']
  },
  {
    '@media': {
      'screen and (min-width: 480px)': {
        width: '480px',
      },
    },
  },
]);

export const landingText = recipe({
  base: {
    color: vars.colors.black,
    margin: vars.space['1x'],
    marginTop: vars.space.none,
    textAlign: 'center',
    width: 'auto',
  },
  variants: {
    contentType: {
      title: {
        fontSize: vars.fontSize['5x'],
        fontWeight: vars.fontWeight['accent']
      },
      content: {
        fontSize: vars.fontSize['3x'],
        fontWeight: vars.fontWeight['normal'],
        marginTop: vars.space['2x'],
        marginBottom: vars.space['2x'],
      },
    }
  }
});



