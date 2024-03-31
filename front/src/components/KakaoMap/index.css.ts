import {style} from '@vanilla-extract/css';
import {vars} from '@/styles/vars.css';

export const searchResultsList = style({
  background: vars.colors.whitesmoke,
  listStyle: 'none',
  width: `calc(100% - ${vars.space['2x']})`,
  maxWidth: '85%',
  margin: '0 auto',
  maxHeight: '144px',
  overflowY: 'auto',
  position: 'absolute',
  zIndex: 1,
  boxShadow: `0px 4px 6px rgba(0, 0, 0, 0.1)`,
  marginTop: vars.space['3x'],
  borderRadius: vars.borderRadius['1x'],
  padding: vars.space['1x'],
  boxSizing: 'border-box',
});


export const searchResultsItem = style({
  width: '100%',
  boxSizing: 'border-box',
  padding: vars.space['1x'],
  borderBottom: `1px solid ${vars.colors.gray}`,
  cursor: 'pointer',
  backgroundColor: vars.colors.white,
  ':hover': {
    backgroundColor: vars.colors.lightGray,
    fontWeight: vars.fontWeight.accent,
  },
  selectors: {
    '&:focus': {
      outline: `2px solid ${vars.colors.gray}`,
      outlineOffset: 2,
    },
    '&:active': {
      backgroundColor: vars.colors.roseGold,
    },
  },
});