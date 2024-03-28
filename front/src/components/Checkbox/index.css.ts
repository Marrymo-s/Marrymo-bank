import {style} from '@vanilla-extract/css';
import {flex} from "@/styles/common.css";

export const checkboxStyle = style({
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  width: '24px',
  height: '24px',
  border: '1px solid gray',
  borderRadius: '8px',
  marginRight: '8px'
});

export const labelStyle = style({
  display: 'flex',
  alignItems: 'flex-start',
});