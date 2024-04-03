import React, {useState, useEffect} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {format, addDays} from 'date-fns';
import {ko} from 'date-fns/locale';

import * as styles from './index.css';

/* eslint-disable @typescript-eslint/no-explicit-any */
registerLocale('ko', ko as any);  // ko 로케일 등록(ESLint 오류 ignore)

interface WeddingDatePickerProps {
  onDateChange: (date: Date) => void;
  onTimeChange: (time: {hour: string, minute: string}) => void;
  onDayChange: (day: string) => void;
}

const WeddingDatePicker = ({onDateChange, onTimeChange, onDayChange}: WeddingDatePickerProps) => {
  // 결혼식 일자 선택
  const [startDate, setStartDate] = useState<Date>(addDays(new Date(), 1));
  // 초기 설정 날짜를 내일로 설정하는 useEffect
  useEffect(() => {
    // 컴포넌트가 마운트될 때 부모 컴포넌트에 초기 날짜와 요일을 전달
    onDateChange(startDate);
    const initialDay = format(startDate, 'EEEE', {locale: ko}).substring(0, 1);
    onDayChange(initialDay);
  }, []);
  // 오늘 이후 날짜부터 선택할 수 있도록 제한하는 변수 tomorrow
  const tomorrow = addDays(new Date(), 1);
  // 결혼식 시간 선택
  const [time, setTime] = useState({hour: '12', minute: '00'});

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    onDateChange(date);
    const fullDayName = format(date, 'EEEE', {locale: ko});
    const initialDayName = fullDayName.substring(0, 1);
    onDayChange(initialDayName);
  };
  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedTime = {...time, hour: event.target.value};
    setTime(updatedTime);
    onTimeChange(updatedTime);
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedTime = {...time, hour: event.target.value};
    setTime(updatedTime);
    onTimeChange(updatedTime);
  };

  return (
    <div className={styles.weddingDatePickerContainer}>
      <div className={styles.datePickerHeaderText}>
        결혼식 일자, 시간 선택
        <span className={styles.asteriskStyle}>*</span>
      </div>
      <div className={styles.selectedDate}>
        <div>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            minDate={tomorrow}
            locale="ko"
            dateFormat="yyyy년 M월 d일"
            dropdownMode="select"
            className={styles.datePicker}
          />
        </div>
        {format(startDate, 'M월 d일 (EEE)', {locale: ko})}
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