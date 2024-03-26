import {style} from "@vanilla-extract/css";
import {contentWrapper} from "@/styles/wrapper.css";
import {flex} from "@/styles/common.css";
import {vars} from "@/styles/vars.css"

export const signupWrapper = style([
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

export const textareaContainer = style({
  position: 'relative',
});

export const textarea = style({
  width: '100%',
  lineHeight: 1.5,
  height: `calc(${vars.fontSize['2x']} * 1.5 * 10)`,
  padding: vars.space['2x'],
  borderColor: vars.colors.lightGray,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: vars.borderRadius['1x'],
  fontSize: vars.fontSize['2x'],
  resize: 'none',
  cursor: 'pointer',
});

export const charCounter = style({
  position: 'absolute',
  bottom: vars.space['1x'],
  right: vars.space['0.5x'],
  fontSize: vars.fontSize['1.5x'],
  color: vars.colors.gray,
});

export const alertMessage = style({
  marginTop: vars.space['0.5x'],
  color: vars.colors.alertRed,
  fontSize: vars.fontSize['1.5x'],
  fontWeight: vars.fontWeight.accent
});

export const weddingDatePickerContainer = style([
  // TODO: '결혼식 일자 선택' 텍스트가 왼쪽에 오도록 정렬하기
  flex({
    align: 'flexStart',
    justify: 'flexStart',
    direction: 'column',
  }),
  {
    fontSize: vars.fontSize['2x']
  }]);

export const asteriskStyle = style({
  marginLeft: vars.space['0.5x'],
  fontSize: vars.fontSize['2x'],
  color: vars.colors.alertRed,
  fontWeight: vars.fontWeight.accent,
})

export const selectedDate = style({
  fontSize: vars.fontSize['2x'],
  textAlign: 'center',
  // Add other styles such as margins, padding, etc.
});

export const datePicker = style({
  // Styles for the input field of the date picker
  borderRadius: '9999px', // Full pill shape
  borderColor: vars.colors.roseGold,
  // Add other styles such as padding, fontSize, etc.
});

export const calendar = style({
  // Styles for the calendar pop-up
  // Customize the look of the selected date, etc.
});

export const calendarWrapper = style({
  // Any additional wrapper styles you need
});

export const timePickerContainer = style([
  // TODO: '결혼식 시간 선택' 텍스트가 왼쪽에 오도록 정렬하기
  flex({
    align: 'flexStart',
    justify: 'flexStart',
    direction: 'row', // direction을 row로 바꿔서 옆으로 나란히 두기
  }),
  {
    fontSize: vars.fontSize['2x'],
    marginBottom: vars.space['2x'], // 아래 여백 추가
  }
]);

export const dropdown = style({
  // 네이티브 select 드롭다운 스타일
  appearance: 'none', // 네이티브 스타일 제거
  padding: vars.space['1x'],
  margin: vars.space['1x'],
  backgroundColor: vars.colors.white,
  borderColor: vars.colors.lightGray,
  borderRadius: vars.borderRadius['1x'],
  fontSize: vars.fontSize['2x'],
  cursor: 'pointer',

  // 선택됐을 때 테두리 색상 변경을 위한 가상 클래스
  selectors: {
    '&:focus': {
      borderColor: vars.colors.roseGold,
      outline: 'none'
    }
  },
  // 추후 CSS 작업 시 여기에 추가
});

export const galleryContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space['2x'],
});

export const galleryHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: vars.space['2x'],
  // 추가적인 스타일 ...
});

export const uploadButton = style({
  padding: vars.space['1x'],
  backgroundColor: vars.colors.lightGray, // 버튼 배경색
  border: 'none',
  borderRadius: vars.borderRadius['1x'],
  cursor: 'pointer',
  // 추가적인 스타일 ...
});

export const imagesContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space['2x'],
  // 컨테이너 크기가 이미지에 따라 조절되도록 설정
});

export const imageWrapper = style({
  width: '100%',
  // 이미지 래퍼 스타일 ...
});

export const image = style({
  width: '100%',
  height: 'auto',
  // 이미지 스타일 ...
});