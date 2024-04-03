import {style} from '@vanilla-extract/css';
import {vars} from '@/styles/vars.css';

export const rightsText = style({
  textAlign: 'center',
  justifyContent: 'center',
  fontSize: vars.fontSize['2x'],
  fontFamily:'BMJua',
  color: vars.colors.lightGray,
  paddingTop: '40px',
})


// 이걸 쓰면 노가다를 안 해도 된당
// 컴포넌트들 사이 간격
export const CardGap = style({
  display: 'grid',
  gap: '80px',
})