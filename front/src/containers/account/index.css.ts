import {style} from "@vanilla-extract/css";
import {contentWrapper} from "@/styles/wrapper.css";
import {flex} from "@/styles/common.css";

export const accountWrapper = style([
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