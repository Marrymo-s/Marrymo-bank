import React, { useRef, useState } from 'react';
import * as styles from './index.css';
import InputBox from "@/components/InputBox";
import {searchInputBoxStyle} from "./index.css";


interface SearchProps {
  search: (query: string) => Promise<void>  // search 함수의 시그니처를 변경하여 직접 query 문자열을 받도록 합니다.
}

const Search = ({ search }:SearchProps) => {
  const queryRef = useRef<HTMLInputElement>(null); // 입력 필드를 위한 ref 생성
  const [query, setQuery] = useState<string>('');
  const handleSearchClick = () => {
    if (query) {
      search(query); // 검색 함수에 입력 필드의 현재 값을 전달
    }
  };

  return (
    <div>
      {/*<input*/}
      {/*  type="text"*/}
      {/*  ref={queryRef} // input 요소에 ref 할당*/}
      {/*  placeholder="검색..."*/}
      {/*/>*/}

      {/*<button onClick={handleSearchClick}>검색</button>*/}
      <div className={styles.searchInputBoxStyle}>
        <InputBox
          inputBoxHeader=''
          value={query}
          placeholder='원하는 가구를 검색해보세요!'
          onValueChange={setQuery}
          button={{
            text: '검색',
            onClick: handleSearchClick,
            type: 'button',
            size: 'small',
          }}
        />
      </div>


    </div>
  );
};

export default Search;
