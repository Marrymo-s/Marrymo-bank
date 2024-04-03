import {style} from '@vanilla-extract/css';

import {vars} from '@/styles/vars.css';

export const inputBoxContainer = style({
  margin: '0 auto',
  maxWidth: '416px',
  width: '100%',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  marginBottom: vars.space['2x'],
});

export const inputBoxHeader = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  fontSize: vars.fontSize['2x'],
  marginBottom: vars.space['0.5x'],
});

export const asterisk = style({
  marginLeft: vars.space['0.5x'],
  color: vars.colors.alertRed,
  fontSize: vars.fontSize['2x'],
  fontWeight: vars.fontWeight.accent,
});

export const errorMessage = style({
  marginTop: vars.space['0.5x'],
  fontSize: vars.fontSize['1x'],
  color: vars.colors.alertRed,
});

export const inputBoxText = style({
  // TODO: width 반응형 적용 및 우측 끝으로 가게 하는 설정 필요
  // flexGrow: 1,
  width: '100%',
  borderWidth: '0.5px',
  borderColor: vars.colors.lightGray,
  borderStyle: 'solid',
  borderRadius: vars.borderRadius['1x'],
  cursor: 'pointer',
  height: '48px',
  padding: '12px 16px',
  boxSizing: 'border-box',
  fontSize: vars.fontSize['2x'],
  fontFamily: 'BMJua',
  color: vars.colors.black,
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

export const inputBoxButtonStyle = style({
  width: '64px',
  flexShrink: 0,
  alignItems: 'center',
});