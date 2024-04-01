import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/vars.css';
import { flex } from '@/styles/common.css';
import {style} from '@vanilla-extract/css';

export const WishCardWrapper = style({
  background: vars.colors.white, // 구역확인용 임시 색
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: vars.colors.lightGray,
  borderRadius: vars.borderRadius['2x'],
  overflow: 'hidden', // 이걸 해줘야 모퉁이가 둥글어짐
  width: 'auto',
  maxWidth: 200,
  height: 'auto',
  position: 'relative',
  boxShadow: `2px 2px 2px 2px ${vars.colors.lightGray}`,
  padding: '1rem', // 내부 여백
  boxSizing: 'border-box', // 패딩을 포함한 너비로 계산
  margin: '10px', // 카드 간의 간격
});

export const WishCardTextWrapper = style({
  textAlign: 'left',
})

export const WishCardTitleText = style({
  fontSize: vars.fontSize['1.5x'],
  fontFamily:'BMJua',
  overflow: 'hidden', // 내용이 넘칠 때 숨김
  textOverflow: 'ellipsis', // 넘친 텍스트를 말줄임표로 표시
  whiteSpace: 'nowrap', // 텍스트가 줄바꿈 없이 한 줄로 표시
  width: '100%', // 부모 요소에 맞춰 너비를 설정
  maxWidth: '100%', // 최대 너비를 부모 요소에 맞춰 설정
});

export const WishCardBrandText = style({
  fontSize: vars.fontSize['1.5x'],
  fontFamily: 'BMJua',
  color: vars.colors.alertRed,
  textOverflow: 'ellipsis', // 넘친 텍스트를 말줄임표로 표시
  whiteSpace: 'nowrap', // 텍스트가 줄바꿈 없이 한 줄로 표시
  width: '100%', // 부모 요소에 맞춰 너비를 설정
  maxWidth: '100%', // 최대 너비를 부모 요소에 맞춰 설정
})

export const WishCardLpriceText = style({
  textOverflow: 'ellipsis', // 넘친 텍스트를 말줄임표로 표시
  whiteSpace: 'nowrap', // 텍스트가 줄바꿈 없이 한 줄로 표시
  width: '100%', // 부모 요소에 맞춰 너비를 설정
  maxWidth: '100%', // 최대 너비를 부모 요소에 맞춰 설정
  fontSize: vars.fontSize['3x'],
  fontWeight: vars.fontWeight.accent
})

export const WishCardCategoryText = style({
  fontSize: vars.fontSize['1.5x'],
  textOverflow: 'ellipsis', // 넘친 텍스트를 말줄임표로 표시
  whiteSpace: 'nowrap', // 텍스트가 줄바꿈 없이 한 줄로 표시
  width: '100%', // 부모 요소에 맞춰 너비를 설정
  maxWidth: '100%', // 최대 너비를 부모 요소에 맞춰 설정
})

export const WishCardButton = style({
  fontSize: vars.fontSize['1x'],
  width: '10px'
})