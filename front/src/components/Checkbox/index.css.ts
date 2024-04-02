import {style} from '@vanilla-extract/css';
import {flex} from "@/styles/common.css";
import { vars } from '@/styles/vars.css';

export const checkboxStyle = style({
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  appearance:'none',
  width: '24px',
  height: '24px',
  border: '1px solid gray',
  borderRadius: '8px',
  marginRight: '8px',
  fontFamily: 'BMJua',

  selectors: {
    '&:checked::after': {
      // 체크되었을 때 ::after 가상 요소를 사용하여 체크 표시
      content: '"✔"',
      position: 'relative',
        top:'-20%',
        left:'10%',
        fontSize: '20px',
        color: 'red'
    }
  }

});

export const labelStyle = style({
  display: 'flex',
  alignItems: 'center',
});