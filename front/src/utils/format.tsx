// 위시리스트 등록 카드에서 가격에 쉼표 넣기용
export function formatPrice(price: string): string {
  const numberPrice = parseInt(price.replace(/[^0-9]/g, ''), 10); // 문자열에서 숫자만 추출하여 정수로 변환
  return new Intl.NumberFormat('ko-KR').format(numberPrice); // 변환된 숫자를 포매팅하여 반환
}