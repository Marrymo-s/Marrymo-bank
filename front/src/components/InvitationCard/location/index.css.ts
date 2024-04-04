import {defaultWrapper, flex} from '@/styles/common.css';
import {contentWrapper} from '@/styles/wrapper.css';
import {vars} from '@/styles/vars.css';
import {style} from '@vanilla-extract/css';

export const locationWrapper = style([
  defaultWrapper({height: 'auto', width: 'max'}),
  {
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: '80px',
  },
]);

export const locationFirstText = style({
  fontSize: vars.fontSize['2x'],
  paddingBottom: '10px',

});

export const locationRawText = style({
  fontSize: vars.fontSize['2.5x'],
  fontWeight: vars.fontWeight.accent,
  paddingBottom: '10px',

});

export const mapContainer = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '400px',
    margin: '0 auto',
  },
);