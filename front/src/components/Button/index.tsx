import {ReactNode} from 'react';
import Link from 'next/link';

import {
  // CommonButtonVariantProps,
  ButtonWrapper,
  commonButton,
} from './index.css';

interface ButtonProps {
  children: ReactNode;
  link?: string;
  disabled?: boolean;
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button';
  size?: 'small' | 'large' | 'medium';
  colorStyle?: 'roseGold' | 'lightGray' | 'alertRed';
  filled?: boolean;
}

const Button = ({
                  link,
                  children,
                  disabled,
                  onClick,
                  type,
                  size = 'large',
                  colorStyle,
                  filled,
                }: ButtonProps) => {
  const actualColorStyle = disabled ? 'lightGray' : colorStyle || 'roseGold';
  if (link) {
    return (
      <div>
        <Link
          href={link}
          className={commonButton({size, colorStyle: actualColorStyle, filled, disabled})}
          onClick={onClick}
        >
          {children}
        </Link>
      </div>
    )
  }

  return (
    <div className={ButtonWrapper[size]}>
      <button type={type}
              disabled={disabled}
              className={commonButton({size, colorStyle: actualColorStyle, filled, disabled})}
              onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

export default Button