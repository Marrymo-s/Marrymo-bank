import {recipe} from '@vanilla-extract/recipes';
import {style} from '@vanilla-extract/css';

import {vars} from '@/styles/vars.css';

const colors: ('roseGold' | 'alertRed' | 'lightGray')[] = ['roseGold', 'alertRed', 'lightGray'];

const filledStyles = colors.flatMap((colorItem: 'roseGold' | 'alertRed' | 'lightGray') => [
  {
    variants: {colorStyle: colorItem, filled: true},
    style: {
      backgroundColor: vars.colors[colorItem],
      border: 'none',
      color: vars.colors.black,
    },
  },
  {
    variants: {colorStyle: colorItem, filled: false},
    style: {
      borderColor: vars.colors[colorItem],
      borderWidth: vars.space['0.5x'],
      borderStyle: 'solid',
      background: vars.colors.black,
      color: vars.colors[colorItem],
    },
  },
]);

const disabledStyle = style({
  // TODO: 이 스타일이 적용이 안 되는 문제를 추후에 해결하기(cursor: 'not-allowed'랑 boxShadow가 안 먹히는 문제
  backgroundColor: vars.colors.lightGray,
  color: vars.colors.white,
  cursor: 'not-allowed',
  boxShadow: 'none',
});

const commonButtonBase = style({
  boxSizing: 'border-box',
  borderRadius: vars.borderRadius.full,
  border: 'none',
  fontSize: vars.fontSize['3x'],
  fontFamily: 'BMJua',
  fontWeight: vars.fontWeight.accent,
  height: 48,
  // margin: 'auto',
  paddingTop: vars.space['0.5x'],
  paddingBottom: vars.space['0.5x'],
  textDecorationLine: 'none',
  cursor: 'pointer',
  // TODO: 버튼 그림자는 다른 부분과 다름(디자인 잡을 때 수정하기)
  boxShadow: `0px ${vars.space['1x']} ${vars.space['2x']} 0px rgba(0, 0, 0, 0.16)`,
});

const commonButtonVariants = {
  size: {
    small: {
      width: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: vars.fontSize['2x'],
      borderRadius: vars.borderRadius['1x'],
    },
    large: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    medium: {
      width: '70%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: vars.fontSize['2.5x'],
    },
  },
  colorStyle: {
    roseGold: vars.colors.roseGold,
    alertRed: vars.colors.alertRed,
    lightGray: vars.colors.lightGray,
  },
  filled: {
    true: {},
    false: {},
  },
  disabled: {
    true: disabledStyle,
    false: {},
  },
};
export const commonButton = recipe({
  base: commonButtonBase,
  variants: commonButtonVariants,
  compoundVariants: [
    ...filledStyles,
    {
      variants: {disabled: true, colorStyle: 'lightGray', filled: true},
      style: disabledStyle,
    },
    {
      variants: {disabled: false, colorStyle: 'roseGold', filled: true},
      style: {
        backgroundColor: vars.colors.roseGold,
      },
    },
  ],
  defaultVariants: {
    size: 'large',
    colorStyle: 'roseGold',
    filled: true,
    disabled: false,
  },
});

export const ButtonWrapper = {
  large: style([
    {
      boxSizing: 'border-box',
      '@media': {
        'screen and (min-width: 480px)': {
          width: 'calc(100% - 32px)',
        },
      },
      width: '100%',
      maxWidth: '416px',
      // marginLeft: 'auto',
      // marginRight: 'auto',
      // paddingLeft: vars.space['4x'],
      // paddingRight: vars.space['4x'],
    },
  ]),
  small: style([
    {
      boxSizing: 'border-box',
      width: '100%',
      maxWidth: '64px',
      // marginLeft: vars.space['2x'],
      // marginRight: vars.space['2x'],
    },
  ]),
  medium: style([
    {
      boxSizing: 'border-box',
      width: '100px',
      marginLeft: vars.space['2x'],
      marginRight: vars.space['2x'],
    },
  ]),
};

export interface CommonButtonVariantProps {
  size: keyof typeof commonButtonVariants.size;
  colorStyle: keyof typeof commonButtonVariants.colorStyle;
  filled: boolean;
}

