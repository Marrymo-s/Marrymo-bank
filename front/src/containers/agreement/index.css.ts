import {style} from "@vanilla-extract/css";
import {vars} from "@/styles/vars.css";
import {flex} from "@/styles/common.css";

export const agreementContainer = style([
  flex({justify: 'center', align: 'center'}),  // center 정렬 적용이 안 됨(원인은 5주차에 잡을 예정)
  {
    width: 'auto',
    maxWidth: '83%',
    padding: vars.space["2x"],
    background: vars.colors.whitesmoke,
    minHeight: '75svh',
    maxHeight: '75svh',
    top: 80,  // Wrapper 로 기본 설정 먹여주기(Header 있을 때와 없을 때), Wrapper로 먹인 후에는 변경
    position: 'relative',
    boxShadow: `0px 10px 25px 0px ${vars.colors.whitesmoke}`,
    overflow: 'auto',
  }]);