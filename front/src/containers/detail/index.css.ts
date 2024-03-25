import {style} from '@vanilla-extract/css';
import {recipe} from '@vanilla-extract/recipes';
import {calc} from '@vanilla-extract/css-utils';

import {flex} from '@/styles/common.css';
import {contentWrapper} from '@/styles/wrapper.css';
import {vars} from '@/styles/vars.css';

export const detailWrapper = style([
  contentWrapper({contentArea: 'header'}),
  flex({
    align: 'center',
    justify: 'flexStart',
    direction: 'column',
  }),
  {
    '@media': {
      'screen and (min-width: 480px)': {
        width: '480px',
      },
    },
  },
]);

export const detailContainer = style({
  background: vars.colors.lightYellow,
  width: 'auto',
  maxWidth: 480,
  height: '400px',
  position: 'relative',
  marginBottom: vars.space['4x'],
  boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,

});

export const detailImage = style({

})

export const detailTitleText = style({

})