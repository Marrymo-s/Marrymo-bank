import {style} from "@vanilla-extract/css";
import {contentWrapper} from "@/styles/wrapper.css";
import {flex} from "@/styles/common.css";

export const withdrawalWrapper = style([
  contentWrapper({contentArea: 'header'}),
  flex({
    align: 'center',
    justify: 'flexStart',
    direction: 'column',
  }),
  {
    '@media': {
      'screen and (min-width: 480px)': {
        width: '480px',
      },
    },
  },
]);

export const withdrawalTitle = style({
    color: 'red',
    fontSize: '25px',
    fontWeight: 'normal',
    paddingTop: '80px',
    paddingBottom: '20px',
})

export const withdrawalDetail = style({
  fontSize: '14.5px',
  paddingBottom: '120px',
})

export const checkboxWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // 왼쪽 정렬
  paddingBottom: '30px',
});

export const buttonWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // 왼쪽 정렬
  paddingBottom: '30px',
});