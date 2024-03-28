import {style} from "@vanilla-extract/css";
import {contentWrapper} from "@/styles/wrapper.css";
import {flex} from "@/styles/common.css";
import {vars} from "@/styles/vars.css"
export const transferWrapper = style([
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

export const asteriskStyle = style({
  marginLeft: vars.space['0.5x'],
  fontSize: vars.fontSize['2x'],
  color: vars.colors.alertRed,
  fontWeight: vars.fontWeight.accent,
})

export const checkInputContainer = style({
  margin: vars.space['3x']
})

export const checkboxContainer = style({
  display:"flex",
  margin: vars.space['2x']
})

export const checkboxStyle = style({
  margin: vars.space['1x']
})

