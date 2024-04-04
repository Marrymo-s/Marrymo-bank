const formatDateTime = (dateString: string, timeString?: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작합니다.
  const day = date.getDate();

  if (!timeString) {
    return `${year}년 ${month}월 ${day}일`; // 시간 정보 없이 날짜만 반환
  }
  const time = timeString.split(':'); // 'HH:MM:SS' 형식을 가정
  const hours = parseInt(time[0], 10);
  const minutes = time[1];

  const isPM = hours >= 12;
  const formattedHours = Math.floor(hours / 13) >= 1 ? hours - 12 : hours; // 12시간제로 변환

  return `${year}년 ${month}월 ${day}일 ` +
    `${isPM ? '오후' : '오전'} ${formattedHours}시 ${minutes}분`;
};

export default formatDateTime;