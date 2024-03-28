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
  flex({justify: 'center', align: 'center'}),  // center 정렬 적용이 안 됨(원인은 5주차에 잡을 예정)
  {
    width: 'auto',
    maxWidth: '83%',
    padding: vars.space["2x"],
    background: vars.colors.whitesmoke,
    minHeight: '56dvh',   // height의 비율 조정하기
    maxHeight: '56dvh',
    margin: '32px 0px',
    position: 'relative',
    boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,
    overflow: 'auto'
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