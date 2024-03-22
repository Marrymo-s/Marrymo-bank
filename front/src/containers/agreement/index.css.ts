import {style} from "@vanilla-extract/css";
import {vars} from "@/styles/vars.css";
import {flex} from "@/styles/common.css";
import {contentWrapper} from "@/styles/wrapper.css";

export const agreementWrapper = style([
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

export const termsOfUseContainer = style([
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
    overflow: 'auto',
  }]);

// TODO: 버튼, 약관 동의 체크 박스가 들어갈 콘테이너를 만든 후에 height: auto 주기