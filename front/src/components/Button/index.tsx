// TODO: 버튼
import { ReactNode } from 'react';
import Link from 'next/link';

// import index.css

interface ButtonProps {
  children: ReactNode;
  link?: string;
  disabled?: boolean;
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button';
}

const Button = ({
  link,
  children,
  disabled,
  onClick,
  type,

}: ButtonProps )  => {
  if (link) {
    return (
      <div>
        <Link
          href={link}
        >
          {children}
        </Link>
      </div>
    )
  }

  return (
    <div>
      <button>
        {children}
      </button>
    </div>
  )
}

export default Button