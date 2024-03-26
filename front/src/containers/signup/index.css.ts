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