import {style} from '@vanilla-extract/css';
import {recipe} from '@vanilla-extract/recipes';

import {vars} from '@/styles/vars.css';
import {defaultWrapper, flex} from '@/styles/common.css';

export const landingWrapper = style([
  defaultWrapper({height: 'max', width: 'max'}),
  {
    textAlign: 'center',
  }
]);

export const landingText = recipe({
  base: {
    color: vars.colors.black,
    margin: vars.space['1x'],
    marginTop: vars.space.none,
    textAlign: 'center',
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



