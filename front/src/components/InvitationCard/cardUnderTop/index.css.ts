import {defaultWrapper, flex} from '@/styles/common.css';
import { contentWrapper } from '@/styles/wrapper.css';
import { vars } from '@/styles/vars.css';
import {style} from '@vanilla-extract/css';

export const cardUnderTopWrapper = style([
  defaultWrapper({ height: 'auto', width: 'max' }),
  {
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: '20px',
  }
]);

export const cardUnderTopText = style([
  {
    width: 'auto',
    maxWidth: 480,
    minHeight: '10svh',
    maxHeight: '30svh',  // 근데 여기 높이를 최소 어느정도하고 안에 내용 많아지면 늘어나게 해야될 듯?
    position: 'relative',
    boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,
    fontSize: vars.fontSize['1.5x'],
  },
  flex({
    justify: 'center', // 가로축 중앙 정렬
    align: 'center', // 세로축 중앙 정렬
    direction: 'column',
  }),

])