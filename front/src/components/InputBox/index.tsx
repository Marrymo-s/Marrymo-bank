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
  value?: string;
  placeholder?: string;
  asterisk?: boolean;
  button?: ButtonProps;
  onValueChange?: (value: string) => void;
}

const InputBox = ({
                    inputBoxHeader,
                    value,
                    placeholder,
                    asterisk,
                    button,
                    onValueChange
                  }: inputBoxProps) => {
  const [error, setError] = useState('');

  const isValidateFormat = (text: string) => {
    // 유효성 검사: 한국어 2 ~ 19자, 영어 4 ~ 38자
    const koreanName = /^[\uac00-\ud7a3 ]{2,19}$/;
    const englishName = /^[A-Za-z ]{4,38}$/;
    return koreanName.test(text) || englishName.test(text);
  };

  const handleBlur = () => {
    const currentValue = value || "";
    if (!isValidateFormat(currentValue)) {
      setError('이름은 한글 2자 이상 19자 이하, 영문자 4자 이상 38자 이하만 가능해요.');
    } else {
      setError('');
    }
  };

  return (
    <div className={styles.inputBoxContainer}>
      <div className={styles.inputBoxHeader}>
        {inputBoxHeader}
        {asterisk && <span className={styles.asterisk}>*</span>}
      </div>
      <div className={styles.inputBoxTextButtonGroup}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onValueChange && onValueChange(e.target.value)}
          onBlur={handleBlur}
          className={styles.inputBoxText}
        />
        {button && (
          <div className={styles.inputBoxButtonStyle}>
            <Button
              type={button.type}
              size={button.size}
              colorStyle={button.colorStyle}
              filled={button.filled}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          </div>
        )}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default InputBox;