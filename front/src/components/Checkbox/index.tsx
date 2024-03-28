import {ReactNode} from 'react';

import * as styles from './index.css';

interface CheckboxProps {
  children: ReactNode,
  checked: boolean,
  onChange: () => void;
}

const Checkbox = ({
                    children,
                    checked,
                    onChange,
                  }: CheckboxProps) => {

  return (
    <label className={styles.labelStyle}>
      <input 
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxStyle}
      />
      {children}
    </label>
  );
}

export default Checkbox