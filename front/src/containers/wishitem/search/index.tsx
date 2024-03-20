import React from 'react';
import * as styles from './index.css';

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>; // useState로부터 반환되는 상태 설정 함수의 타입으로
  search: () => Promise<void>; // 비동기 함수이므로 Promise<void> 타입 사용
}

const Search = ({ query, setQuery, search }:SearchProps) => {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색..."
      />
      <button onClick={search}>검색</button>
    </div>
  );
};

export default Search;
