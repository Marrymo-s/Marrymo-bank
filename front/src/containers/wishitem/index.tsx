'use client';

import React, {useState} from 'react';
import Header from "@/components/Header";
import Button from '@/components/Button';
import Search from '@/containers/wishitem/search';
import Registration from '@/containers/wishitem/registration';
import Results from '@/containers/wishitem/results';

import {searchResponse} from '@/types/search';

import * as styles from './index.css';
import axios from 'axios';

const WishItem = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<searchResponse[]>([]);
  const [wishLists, setWishLists] = useState<searchResponse[]>([]);

  const search = async () => {
    const clientId = process.env.NEXT_PUBLIC_NAVERAPI_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_NAVERAPI_CLIENT_SECRET;
    const apiUrl = '/v1/search/shop.json?';
    // 네이버 검색 api 사용
    try {
      const response = await axios.get(`${apiUrl}`, {
        params: {query},
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

  // 선택하면 wishlist에 추가하는 함수
  const addToWishlist = (item: searchResponse) => {
    setWishLists([...wishLists, item])
    console.log(item)
  }

  //TODO 위에 네이버 검색하는거 Search로 옮기는 걸로 코드 수정하기
  return (
    <>
      <Header title="위시리스트" hasPrevious/>
      <main className={styles.wishitemWrapper}>
        <div className={styles.wishitemContainer}>
          <Search query={query} setQuery={setQuery} search={search}/>
          <Registration wishLists={wishLists}/>
          <Results results={results} addToWishlist={addToWishlist}/>
        </div>
      </main>
    </>
  )
}

export default WishItem;
