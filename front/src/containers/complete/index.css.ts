import {keyframes, style} from '@vanilla-extract/css';
import {recipe} from '@vanilla-extract/recipes';

import {vars} from '@/styles/vars.css';
import {flex} from '@/styles/common.css';
import {contentWrapper} from '@/styles/wrapper.css';

export const completeWrapper = style([
  contentWrapper({contentArea: 'header'}),
  flex({
    align: 'center',
    justify: 'flexStart',
    direction: 'column',
  }),
  {
    width: '100%',
    height: '800px',
    maxHeight: '1000px',
    position: 'relative',
    aspectRatio: '16 / 9',
    padding: vars.space['4x'],
    overflow: 'hidden',
  },
  {
    '@media': {
      'screen and (min-width: 480px)': {
        width: '480px',
      },
    },
  },
]);

export const completeText = recipe({
  base: {
    color: vars.colors.black,
    margin: vars.space['1x'],
    marginTop: '80px',
    marginBottom: '80px',
    textAlign: 'center',
    width: 'auto',
  },
  variants: {
    contentType: {
      title: {
        fontSize: vars.fontSize['5x'],
        fontWeight: vars.fontWeight['accent'],
      },
      content: {
        fontSize: vars.fontSize['3x'],
        fontWeight: vars.fontWeight['normal'],
        marginTop: vars.space['2x'],
        marginBottom: vars.space['5x'], // 여기서 '5x'는 원하는 간격에 맞게 조정하세요.
      },
    },
  },
});

export const thankWrapper = style({
  // 기본 스타일
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '500px',
  maxHeight: '600px',
  marginTop: vars.space['5x'], // 여기서 '5x'는 원하는 간격에 맞게 조정하세요.
  position: 'relative',
  aspectRatio: '16 / 9',
  overflow: 'hidden',

});

const float = keyframes({
  '0%': {
    transform: 'translateY(0px)',
  },
  '50%': {
    transform: 'translateY(-20px)',
  },
  '100%': {
    transform: 'translateY(0px)',
  },
});

export const heart = style({
  position: 'absolute',
  top: '4%',
  left: '48%',
  marginBottom: '5px',
  transform: 'translate(-50%, -50%)',
  fontSize: '30px', // Adjust size as needed
  color: 'red',
  animation: `${float} 2s ease-in-out infinite`,
});

export const buttonContainer = style({
  display: 'flex',
  marginTop: '100px',
  width: '100%',
  justifyContent: 'center',
  alignContent: 'center',
  margin: vars.space['2x'],
});