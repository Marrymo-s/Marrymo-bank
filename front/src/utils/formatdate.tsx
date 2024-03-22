const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더해줌
  const year = date.getFullYear().toString().substr(2, 2); // 년도의 마지막 두 자리만 가져옴
  return `${year}/${month}/${day}`;
};

export default formatDate;