'use client';

import React, {useState} from 'react';

import * as styles from './index.css';
import Button from '@/components/Button'

interface ButtonProps {
  text: string;
  onClick: () => void;
  type: 'submit' | 'reset' | 'button';
  size?: 'small' | 'large';
  colorStyle?: 'roseGold' | 'lightGray' | 'alertRed';
  filled?: boolean;
}

interface inputBoxProps {
  inputBoxHeader: string;
  button?: ButtonProps;
}

const InputBox = ({inputBoxHeader}: inputBoxProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const isValidateFormat = (value: string) => {
    // 유효성 검사: 한국어 2 ~ 19자, 영어 4 ~ 38자
    const koreanName = /^[\uac00-\ud7a3 ]{2,19}$/;
    const englishName = /^[A-Za-z ]{4,38}$/;
    return koreanName.test(value) || englishName.test(value);
  };

  const nameValidationError = () => {
    if (!isValidateFormat(name)) {
      setError('이름은 한글 2자 이상 19자 이하, 영문자 4자 이상 38자 이하만 가능해요.');
    } else {
      setError('');
    }
  };

  return (
    <div className={styles.inputBoxContainer}>
      <div className={styles.inputBoxHeader}>
        {inputBoxHeader}
        <span className={styles.asterisk}>*</span>
      </div>
      <div className={styles.inputBoxTextButtonGroup}>
        <input
          type="text"
          placeholder="place holder"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={nameValidationError}
          className={styles.inputBoxText}
        />
        {Button && (
          <Button
            type={Button.type}
            size={Button.size}
            colorStyle={Button.colorStyle}
            filled={Button.filled}
            onClick={Button.onClick}
          >
            {Button.text}
          </Button>
        )}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default InputBox;