import {style} from '@vanilla-extract/css';
import {contentWrapper} from '@/styles/wrapper.css';
import {flex} from '@/styles/common.css';
import {vars} from '@/styles/vars.css';

export const editWrapper = style([
  contentWrapper({contentArea: 'header'}),
  flex({
    align: 'center',
    justify: 'flexStart',
    direction: 'column',
  }),
  {
    '@media': {
      'screen and (min-width: 416px)': {
        width: '100%',
      },
    },
    width: '100%',
    margin: '0',
    padding: '112px 32px 32px',
    boxSizing: 'border-box',
  },
]);

export const textareaContainer = style({
  maxWidth: '416px',
  width: '100%',
  position: 'relative',
  // padding: `0 ${vars.space['2x']}`,
  boxSizing: 'border-box',
  marginBottom: vars.space['2x'],
});

export const textarea = style({
  width: '92%',
  lineHeight: 1.5,
  height: `calc(${vars.fontSize['2x']} * 1.5 * 10)`,
  padding: vars.space['2x'],
  borderColor: vars.colors.lightGray,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: vars.borderRadius['1x'],
  fontSize: vars.fontSize['2x'],
  fontFamily: 'BMJua',
  resize: 'none',
  cursor: 'pointer',
  '::placeholder': {
    color: vars.colors.lightGray,
  },
});

export const charCounter = style({
  position: 'absolute',
  bottom: vars.space['1x'],
  right: vars.space['1x'],
  fontSize: vars.fontSize['1.5x'],
  color: vars.colors.gray,
});

export const alertMessage = style({
  marginTop: vars.space['0.5x'],
  color: vars.colors.alertRed,
  fontSize: vars.fontSize['1.5x'],
  fontWeight: vars.fontWeight.accent,
});

export const weddingDatePickerContainer = style([
  flex({
    align: 'flexStart',
    justify: 'flexStart',
    direction: 'column',
  }),
  {
    width: '100%',
    marginBottom: vars.space['2x'],
    fontSize: vars.fontSize['2x'],
  },
]);

export const asteriskStyle = style({
  marginLeft: vars.space['0.5x'],
  fontSize: vars.fontSize['2x'],
  color: vars.colors.alertRed,
  fontWeight: vars.fontWeight.accent,
});

export const selectedDate = style({
  fontSize: vars.fontSize['2x'],
  textAlign: 'center',
  width: '100%',
});

export const datePicker = style({
  display: 'flex',
  width: '100%',
  borderRadius: vars.borderRadius['2x'], // Full pill shape
  padding: `${vars.space['1x']} ${vars.space['2x']}`,
  height: vars.space['4x'],
  borderColor: vars.colors.roseGold,
  fontSize: vars.space['2x'],
  fontWeight: vars.fontWeight.accent,
  alignContent: 'flex-start',
  justifyContent: 'center',
});

export const dropdown = style({
  appearance: 'none',
  padding: vars.space['1x'],
  margin: vars.space['1x'],
  backgroundColor: vars.colors.white,
  borderColor: vars.colors.lightGray,
  borderRadius: vars.borderRadius['1x'],
  fontSize: vars.fontSize['2x'],
  cursor: 'pointer',
  selectors: {
    '&:focus': {
      borderColor: vars.colors.roseGold,
      outline: 'none',
    },
  },
});

export const galleryContainer = style({
  position: 'relative',
  display: 'flex',
  maxWidth: '416px',
  height: '100px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: vars.space['1x'],
  overflowX: 'auto',
  marginBottom: vars.space['2x'],
});

export const imageBox = style({
  position: 'relative',
  minWidth: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: vars.borderRadius['1x'],
});

export const deleteButton = style({
  position: 'absolute',
  top: 0,
  right: 0,
  background: vars.colors.alertRed,
  color: 'black',
  border: 'none',
  borderRadius: vars.borderRadius.full,
  width: vars.space['3x'],
  height: vars.space['3x'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.alertRed,
    },
  },
});

export const inputBoxStyle = style({
  width: '100%',
  marginBottom: vars.space['2x'],
});

export const buttonContainer = style({
  width: '100%',
  marginTop: vars.space['2x'],
  marginBottom: vars.space['2x'],
});

export const errorMessage = style({
  marginTop: vars.space['1x'],
  color: vars.colors.alertRed,
  fontSize: vars.fontSize['1x'],
  textAlign: 'center',
});