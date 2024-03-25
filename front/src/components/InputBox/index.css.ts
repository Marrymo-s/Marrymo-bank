import {style} from '@vanilla-extract/css';

import {vars} from '@/styles/vars.css';

export const inputBoxContainer = style({
  padding: `0 ${vars.space['4x']}`,
  width: `calc(100% - 2 * ${vars.space['4x']})`,
  maxWidth: '100%',
  boxSizing: 'border-box',
});

export const inputBoxHeader = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: vars.fontSize['2x'], // Assuming you have fontSize defined in your vars
});

export const asterisk = style({
  marginLeft: vars.space['0.5x'],
  color: vars.colors.alertRed,
  fontSize: vars.fontSize['2x'],
  fontWeight: vars.fontWeight.accent
});

export const input = style({
  // ... add your input box styling here
});

export const errorMessage = style({
  fontSize: vars.fontSize['1.5x'],
  color: vars.colors.alertRed,
});

export const inputBoxText = style({
  borderWidth: '0.5px',
  borderColor: vars.colors.lightGray, // Assuming you have a color defined for borders
  borderStyle: 'solid',
  borderRadius: vars.borderRadius["1x"],
  cursor: 'pointer',
  height: '48px',
  padding: '12px 16px', // 12px vertical padding, 16px horizontal padding
  boxSizing: 'border-box',
  fontSize: vars.fontSize['2x'],
  color: vars.colors.black,
  // placeholder 텍스트 색깔은 lightGray
  '::placeholder': {
    color: vars.colors.lightGray,
  },
});

export const inputBoxTextButtonGroup = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: vars.space['2x'],
});