'use client';

import React, { useState, useEffect } from 'react';
import { searchResponse } from '@/types/search';
import { useRouter } from 'next/navigation';
import * as styles from './index.css';
import Image from 'next/image';

import { fetchInstance } from '@/services';

import { userInfoStore } from '@/store/useUserInfo';
import {registraionEachImageWrapper} from "./index.css";



interface WishListItem {
  wishItemSequence: number;
  name: string;
  price: number;
  img: string;
}

interface RegistrationProps {
  refresh: () => void;
  trigger: boolean;
}

const Registration = ({ refresh, trigger }:RegistrationProps) => {
  const [wishLists, setWishLists] = useState<WishListItem[]>([]);
  const router = useRouter();
  const userCode = userInfoStore((state) => state.userCode);

  console.log(userCode)

  // trigger 값의 변경을 감지하여 위시리스트 데이터 다시 불러오기
  useEffect(() => {
    getWishData();
  }, [trigger]); // trigger를 의존성 배열에 추가
  const getWishData = async () => {
    try {
      const response = await fetchInstance(`/wish-item/${userCode}`);
      setWishLists([...response.items].reverse());
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };



  const goToDetail = (num:number) => {
    router.push(`detail/${userCode}/${num}`)
  }


  return (
    <div className={styles.registrationContainer}>
      <h3>나의 WISHLIST</h3>
      <div className={styles.registrationOuterWrapper}>
        <div className={styles.registrationInnerWrapper}>
          {wishLists.map((wishlist, index) => (
            // <div
            //   key={wishlist.wishItemSequence}
            //   className={styles.wishlistImageWrapper}>
            //   {wishlist.name}
            //
            // </div>
            <Image
              key={index}
              src={wishlist.img}
              width={50}
              height={50}
              alt="Picture of the author"
              className={styles.registraionEachImageWrapper}
              onClick={() => goToDetail(wishlist.wishItemSequence) }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Registration;
