import React, {useState} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import * as styles from './index.css';

import {format} from 'date-fns';
import ko from 'date-fns/locale/ko';

/* eslint-disable @typescript-eslint/no-explicit-any */
registerLocale('ko', ko as any);  // ko 로케일 등록(ESLint 오류 ignore)

const WeddingDatePicker = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <div>
      <div className={styles.selectedDate}>
        {/*TODO: 요일을 한국어로 표시되게끔 하는 방법 {locale: ko}는 에러가 남, 다른 방법 찾기*/}
        {format(startDate, 'M월 d일 (EEE)')}
      </div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        locale='ko'
        dateFormat="yyyy년 M월 d일"
        dropdownMode="select"
        className={styles.datePicker}
        calendarClassName={styles.calendar}
        wrapperClassName={styles.calendarWrapper}
      />
    </div>
  );
};

export default WeddingDatePicker;