import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/vars.css';
import { defaultWrapper, flex} from '@/styles/common.css';
import {style} from '@vanilla-extract/css';

export const registrationContainer = style([
  {

  },
])

export const registrationOuterWrapper = style([
  {
    width: 400,
    height: '100px',
    border: `1px solid ${vars.colors.whitesmoke}`,
    overflowX: 'auto', // 가로 스크롤만 허용
    display: 'flex',
    flexDirection: 'row',
    whiteSpace: 'nowrap', // 자식 요소들이 줄 바꿈 없이 나열되도록 설정
  }
])

export const registrationInnerWrapper = style([
  {
    display: 'flex',
    flexDirection: 'row',
    width: '100px',
    height: '100px',
    border: vars.colors.black,
    whiteSpace: 'nowrap', // 자식 요소들이 줄 바꿈 없이 나열되도록 설정
  }
])

export const registraionEachImageWrapper = style({
  width: '80%',
  height: '80%',
  padding: '2px',
  margin: '5px',
  border: vars.colors.lightGray,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: vars.borderRadius["2x"]
})

export const wishlistImageWrapper = style({
  display: 'inline-block', // 인라인 블록으로 설정하여 여러 이미지가 나란히 배치될 수 있도록 함
  margin: '5px',
  border: `1px solid ${vars.colors.lightGray}`,
  width: '90px',
  height: '90px',


});