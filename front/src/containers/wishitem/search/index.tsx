import React, { useState } from 'react';
import axios from 'axios';

import { searchResponse } from '@/types/search';

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<searchResponse[]>([]);

  const clientId = process.env.NEXT_PUBLIC_NAVERAPI_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVERAPI_CLIENT_SECRET;
  const apiUrl = '/v1/search/shop.json?';
  const search = async () => {
    try {
      const response = await axios.get(`${apiUrl}`, {
        params: { query },
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-Naver-Client-Id": clientId,
          "X-Naver-Client-Secret": clientSecret,
        },
      });
      setResults(response.data.items); // 검색 결과를 상태에 저장합니다.
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색..."
      />
      <button onClick={search}>검색</button>
      <div>
        {results.map((item, index) => (
          <div key={index}>
            <div>{item.title}</div>
            <img
              style={{width: '200px', height: '200px'}}
              src={item.image}
              alt="가전이미지"
            />
            <div>{item.lprice}원</div>
            <div>{item.brand}</div>
            <div>{item.category2}-{item.category4}</div>
            <br />
          </div>
        ))}
      </div>
    </>
  )
}

export default Search;
