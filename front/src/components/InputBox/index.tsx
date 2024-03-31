'use client';

import React, {useState, useEffect} from 'react';

import * as styles from './index.css';
import Button from '@/components/Button';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type: 'submit' | 'reset' | 'button';
  size?: 'small' | 'large';
  colorStyle?: 'roseGold' | 'lightGray' | 'alertRed';
  filled?: boolean;
}

interface inputBoxProps {
  inputBoxHeader?: string;
  value?: string;
  placeholder?: string;
  asterisk?: boolean;
  button?: ButtonProps;
  onValueChange?: (value: string) => void;
  validate?: (value: string) => string | undefined;
  onValidationPassed?: () => void;
  readonly?: boolean;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
                    readonly,
                    onClick,
                    onKeyDown,
                  }: inputBoxProps) => {
  const [error, setError] = useState('');

  const handleBlur = () => {
    const currentValue = value || '';
    if (validate) {
      const validationError: string | undefined = validate(currentValue);
      setError(validationError || '');
      if (!validationError && onValidationPassed) {
        onValidationPassed();
      }
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
          readOnly={readonly}
          onClick={onClick}
          onKeyDown={onKeyDown}
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