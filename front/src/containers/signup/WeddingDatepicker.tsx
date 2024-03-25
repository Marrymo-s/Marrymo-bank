import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles
import * as styles from './index.css';
import {format} from 'date-fns';
import ko from 'date-fns/locale/ko'; // Korean locale

const WeddingDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <div className={styles.selectedDate}>
        {format(startDate, 'M월 d일 (EEE)', {locale: ko})}
      </div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        locale={ko}
        dateFormat="yyyy년 MM월 d일"
        dropdownMode="select"
        className={styles.datePicker}
        calendarClassName={styles.calendar}
        wrapperClassName={styles.calendarWrapper}
      />
    </div>
  );
};

export default WeddingDatePicker;