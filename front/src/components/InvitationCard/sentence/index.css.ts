import {defaultWrapper, flex} from '@/styles/common.css';
import {contentWrapper} from '@/styles/wrapper.css';
import {vars} from '@/styles/vars.css';
import {style} from '@vanilla-extract/css';

export const sentenceWrapper = style([
  defaultWrapper({height: 'auto', width: 'max'}),
  {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '80px',
    width: '100%',
    maxWidth: '360px',
    height: 'auto',
    margin: '0 auto',
    lineHeight: 3,
    gap: '20px',
  },
]);
