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

  useEffect(() => { // 수정된 useEffect 사용법
    const getWishData = async () => {
      try {
        const response = await fetchInstance(`/wish-item/${userCode}`);
        console.log(response);
        setWishLists([...response.items].reverse())

      } catch(error) {
        console.error('에러 ㅋ', error);
      }
    };

    getWishData()
    // 'wishAdded' 이벤트에 대한 리스너 등록
    window.addEventListener('wishAdded', getWishData);

    return () => {
      window.removeEventListener('wishAdded', getWishData);
      console.log('삭제완료')
    };

  }, [userCode]);

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
