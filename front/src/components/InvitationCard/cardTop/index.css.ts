import {defaultWrapper, flex} from '@/styles/common.css';
import { contentWrapper } from '@/styles/wrapper.css';
import { vars } from '@/styles/vars.css';
import {style} from '@vanilla-extract/css';


export const cardTopWrapper = style([
  defaultWrapper({ height: 'auto', width: 'max' }),
  {
    textAlign: 'center',
    justifyContent: 'center',
  }
]);

export const cardTopText = style([
  {
    width: 'auto',
    maxWidth: 480,
    minHeight: '10dvh',
    maxHeight: '10dvh',
    position: 'relative',
    fontSize: vars.fontSize['4x'],
    fontWeight: vars.fontWeight.accent,
    paddingTop: '80px',
  },

])

export const cardTopImage = style([
  {
    width: '100%', // 왜 이걸 100% 해야 중앙에 옴?
    height: '300px',
    maxHeight: '600px',
    paddingTop: '80px',


  },
  flex({
    justify: 'center', // 가로축 중앙 정렬
    align: 'center', // 세로축 중앙 정렬
  })
])


