import {style} from "@vanilla-extract/css";
import {contentWrapper} from "@/styles/wrapper.css";
import {flex} from "@/styles/common.css";
import {vars} from "@/styles/vars.css";

export const checkboxesContainer = style([
    flex({
      justify: 'center',
      align: 'center',
  })
])

export const historyListContainer = style([
  // flex({justify: 'center'}),  // center 정렬 적용이 안 됨(원인은 5주차에 잡을 예정)
  {
    width: 'auto',
    // maxWidth: '83%',
    padding: vars.space["0.5x"],
    background: vars.colors.lightBeige,
    minHeight: '60dvh',   // height의 비율 조정하기
    maxHeight: '60dvh',
    margin: '32px',
    position: 'relative',
    boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,
    overflow: 'auto',
    borderRadius: '10px',
  }
  ]);

export const historyWrapper = style([
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

export const historyTableWrapper = style({
  width:'100%',
  tableLayout: 'fixed',
  borderSpacing: '5px',
  
})

export const historyHeadWrapper = style({
  position:'sticky',
  top:0,
  fontSize: '20px',
  backgroundColor:vars.colors.roseGold,
  padding: '10px',
})

export const historyBodyWrapper = style([
  {
    textAlign:'center',
    width: '100%',
  }
])

export const historyTHStyle = style([
  {
    borderRadius: '5px',
  }
])

// 셀 범위를 넘어간 경우 줄바꿈 처리
export const cellStyle = style({
  wordBreak: 'break-word'
})