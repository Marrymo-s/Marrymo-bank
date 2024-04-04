import * as styles from './index.css';
import React from 'react';
import {signupRequest} from '@/types/auth';

type sentenceProps = Pick<signupRequest, 'greeting'>

const Sentence = ({greeting}: sentenceProps) => {
  return (
    <div className={styles.sentenceWrapper}>
      <div>{greeting}</div>
    </div>
  );
};

export default Sentence;
