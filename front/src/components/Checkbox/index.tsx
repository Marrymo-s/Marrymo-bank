import {ReactNode, useState} from 'react';
import * as styles from './index.css';
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;

interface CheckboxProps {
  children: ReactNode,
}

const Checkbox = ({
                    children,
                  }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  }
  return (
    <label className={styles.labelStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleCheckbox}
        className={styles.checkboxStyle}
      />
      {children}
    </label>
  );
}

export default Checkbox