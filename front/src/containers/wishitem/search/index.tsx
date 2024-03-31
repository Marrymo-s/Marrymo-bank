import React, { useRef } from 'react';
import * as styles from './index.css';

interface SearchProps {
  search: (query: string) => Promise<void>  // search 함수의 시그니처를 변경하여 직접 query 문자열을 받도록 합니다.
}

const Search = ({ search }:SearchProps) => {
  const queryRef = useRef<HTMLInputElement>(null); // 입력 필드를 위한 ref 생성

  const handleSearchClick = () => {
    if (queryRef.current) {
      search(queryRef.current.value); // 검색 함수에 입력 필드의 현재 값을 전달
    }
  };

  return (
    <div>
      <input
        type="text"
        ref={queryRef} // input 요소에 ref 할당
        placeholder="검색..."
      />
      <button onClick={handleSearchClick}>검색</button>
    </div>
  );
};

export default Search;
