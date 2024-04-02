import React from 'react';
import * as styles from './index.css';



interface ProgressBarProps {
  fund: number;
  price: number;
}

const ProgressBar = ({fund, price}: ProgressBarProps) => {

  const progressPercent = (fund / price) * 100;
  return (
    <div
      className={styles.progressTotalContainer}
    >
      <div
        className={styles.progressPartialContainer}
        style={{ width: `${progressPercent}%`}}
      >
        {progressPercent.toFixed(0)}%
      </div>
    </div>
  );
}

export default ProgressBar;
