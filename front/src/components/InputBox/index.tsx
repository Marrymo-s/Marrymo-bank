'use client';

import React, {useState, useEffect} from 'react';

import * as styles from './index.css';
import Button from '@/components/Button';
import {formatAvailableValues} from 'next/dist/compiled/@next/font/dist/format-available-values';

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
  validate?: (value: string) => string | undefined;
  onValidationPassed?: () => void;
}

const InputBox = ({
                    inputBoxHeader,
                    value,
                    placeholder,
                    asterisk,
                    button,
                    onValueChange,
                    validate,
                    onValidationPassed,
                  }: inputBoxProps) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (value && validate) {
      const validationError: string | undefined = validate(value);
      setError(validationError || '');
      if (!validationError && onValidationPassed) {
        onValidationPassed();
      }
    }
  }, [value, validate, onValidationPassed]);
  const handleBlur = () => {
    const currentValue = value || '';
    const validationError = validate ? validate(currentValue) : undefined;
    setError(validationError || '');
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