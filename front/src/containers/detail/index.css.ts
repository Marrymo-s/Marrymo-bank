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
    padding: vars.space['4x'],
  },
  {
    '@media': {
      'screen and (min-width: 480px)': {
        width: '480px',
        margin: '0 auto',
      },
    },
    width: '100%',
  },
]);

export const detailImageWrapper = style({
  borderColor: vars.colors.black,
  borderWidth: '1px',
  borderStyle: 'solid',
  objectFit: 'cover',
  width: 'auto',


})

export const detailImageContainer = style({
  background: vars.colors.lightYellow,
  width: 'auto',
  maxWidth: 480,
  height: '2000',
  position: 'relative',
  marginBottom: vars.space['4x'],
  boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,
  overflow: 'hidden',
  borderColor: vars.colors.black,
  borderWidth: '1px',
  borderStyle: 'solid',

});

export const detailImage = style({

})

export const detailNameText = style({
  fontSize: vars.fontSize['4x'],
  overflow: 'hidden', // 내용이 넘칠 때 숨김
  textOverflow: 'ellipsis', // 넘친 텍스트를 말줄임표로 표시
  whiteSpace: 'nowrap', // 텍스트가 줄바꿈 없이 한 줄로 표시
  width: '100%', // 부모 요소에 맞춰 너비를 설정
  maxWidth: '100%', // 최대 너비를 부모 요소에 맞춰 설정
  paddingLeft: '110px',
})

export const detailTotalPriceText = style({
  fontSize: vars.fontSize["3x"]
})

export const detailPartialPriceText = style({
  fontSize: vars.fontSize["3x"],
  fontWeight: vars.fontWeight.accent
})

export const detailColorText = style({
  color: vars.colors.strongYellow,
  fontSize: vars.fontSize["4x"],
  fontWeight: vars.fontWeight.accent
})