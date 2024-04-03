'use client';

import React, {useState} from 'react';
import Header from "@/components/Header";
import Button from '@/components/Button';
import Search from '@/containers/wishitem/search';
import Registration from '@/containers/wishitem/registration';
import Results from '@/containers/wishitem/results';

import {searchResponse} from '@/types/search';

import { fetchInstance } from "@/services";

import * as styles from './index.css';
import axios from 'axios';
import {userInfoStore} from "@/store/useUserInfo";

type Props = {
  params: { userCode: string}
}
const WishItem = ({params}: Props) => {
  const [results, setResults] = useState<searchResponse[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  const userCode = userInfoStore((state) => state.userCode)
  // console.log(userCode)
  const refreshData = () => {
    setTrigger(!trigger);
  };
  const search = async (query: string) => {
    const clientId = process.env.NEXT_PUBLIC_NAVERAPI_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_NAVERAPI_CLIENT_SECRET;
    const apiUrl = '/v1/search/shop.json?';


    try {
      const response = await axios.get(`${apiUrl}`, {
        params: {query},
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-Naver-Client-Id": clientId,
          "X-Naver-Client-Secret": clientSecret,
        },
      });
      setResults(response.data.items);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };
  console.log('상태:',trigger)
  if (!userCode) {
    return <div>ㅎㅎ..</div>
  }
  return (
    <>
      <Header title="위시리스트" hasPrevious/>
      <main className={styles.wishitemWrapper}>
        <div className={styles.wishitemContainer}>
          <Search search={search}/>
          <Registration trigger={trigger} userCode={userCode}/>
          <Results results={results} refreshData={refreshData}/>
        </div>
      </main>
    </>
  )
}

export default WishItem;
