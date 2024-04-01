import {globalFontFace, style} from '@vanilla-extract/css';

const globalPretendard = 'pretendard';

globalFontFace(globalPretendard, {
  src: "url('/fonts/woff2/PretendardVariable.woff2') format('woff')",
  fontWeight: 400,
});

export const globalFont = style({
  fontFamily: globalPretendard,
});


// 청첩장용 폰트

const gowun = 'Gowun Batang';

globalFontFace(gowun, {
  src: "url('/fonts/ttf/GowunBatang-Bold.ttf') format('truetype')",
  fontWeight: 400,
  fontStyle: 'normal',
  fontDisplay: 'swap'
});

export const cardFont = style({
  fontFamily: gowun,
});

export const bmJuaFontFamily = globalFontFace('BMJua',{
  src: `url('/fonts/ttf/GowunBatang-Bold.ttf') format('truetype')`,
  fontWeight: '400',
  fontStyle:'normal'
})