import React, {useState} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {format, addDays} from 'date-fns';
import {ko} from 'date-fns/locale';

import * as styles from './index.css';

/* eslint-disable @typescript-eslint/no-explicit-any */
registerLocale('ko', ko as any);  // ko 로케일 등록(ESLint 오류 ignore)

interface WeddingDatePickerProps {
  onDateChange: (date: Date) => void;
  onTimeChange: (time: { hour: string, minute: string }) => void;
  onDayChange: (day: string) => void;
}

const WeddingDatePicker = ({onDateChange, onTimeChange, onDayChange}: WeddingDatePickerProps) => {
  // 결혼식 일자 선택
  const [startDate, setStartDate] = useState<Date>(addDays(new Date(), 1));
  // 오늘 이후 날짜부터 선택할 수 있도록 제한하는 변수 tomorrow
  const tomorrow = addDays(new Date(), 1);
  // 결혼식 시간 선택
  const [time, setTime] = useState({hour: '12', minute: '00'})

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    onDateChange(date);
    const day = format(date, 'EEEE', {locale: ko});
    onDayChange(day);
  }
  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedTime = {...time, hour: event.target.value}
    setTime(updatedTime);
    onTimeChange(updatedTime);
  }

  const handleMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedTime = {...time, hour: event.target.value};
    setTime(updatedTime);
    onTimeChange(updatedTime);
  };

  return (
    <div>
      <div className={styles.selectedDate}>
        {format(startDate, 'M월 d일 (EEE)', {locale: ko})}
      </div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        minDate={tomorrow}
        locale="ko"
        dateFormat="yyyy년 M월 d일"
        dropdownMode="select"
        className={styles.datePicker}
        calendarClassName={styles.calendar}
        wrapperClassName={styles.calendarWrapper}
      />
      <div className={styles.timePickerContainer}>
        <div>
          결혼식 시간
          <span className={styles.asteriskStyle}>*</span>
        </div>
        <select
          value={time.hour}
          onChange={handleHourChange}
          className={styles.dropdown}
        >
          {[...Array(24)].map((_, index) => (
            <option key={index} value={index < 10 ? `0${index}` : index.toString()}>
              {index < 10 ? `0${index}` : index}
            </option>
          ))}
        </select>시
        <select
          value={time.minute}
          onChange={handleMinuteChange}
          className={styles.dropdown}
        >
          <option value="00">00</option>
          <option value="30">30</option>
        </select>분
      </div>
    </div>
  );
};

export default WeddingDatePicker;