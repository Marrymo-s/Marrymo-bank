'use client';

import React, {useState, useEffect} from 'react';
import {searchResponse} from '@/types/search';
import {useRouter} from 'next/navigation';
import * as styles from './index.css';
import Image from 'next/image';

import {fetchInstance} from '@/services';

import {userInfoStore} from '@/store/useUserInfo';
import {registraionEachImageWrapper} from './index.css';

interface WishListItem {
  wishItemSequence: number;
  name: string;
  price: number;
  img: string;
}

interface RegistrationProps {
  refresh: () => void;
  trigger: boolean;
  userCode: string;
}

const Registration = ({refresh, trigger, userCode}: RegistrationProps) => {
  const [wishLists, setWishLists] = useState<WishListItem[]>([]);
  const router = useRouter();


  console.log(userCode);

  // trigger 값의 변경을 감지하여 위시리스트 데이터 다시 불러오기
  // useEffect(() => {
  //   getWishData(userCode);
  // }, [trigger]); // trigger를 의존성 배열에 추가
  // const getWishData = async (uc:string) => {
  //   try {
  //     const response = await fetchInstance(`/wish-item/${uc}`);
  //     setWishLists([...response.items].reverse());
  //   } catch (error) {
  //     console.error('Fetching error:', error);
  //   }
  // };
  useEffect(() => {
    console.log(`userCode: ${userCode}`)
    if (userCode) {
      (async () => {
        try {
          const response = await fetchInstance(`/wish-item/${userCode}`);
          console.log(response)
          setWishLists(response.items)
        } catch (error) {
          console.error('조회실패')
        }
      })();
    } else {
      console.log('userCode is not defined yet.');
    }
  }, [])
  console.log(wishLists)

  const goToDetail = (num: number) => {
    router.push(`detail/${userCode}/${num}`);
  };


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
              onClick={() => goToDetail(wishlist.wishItemSequence)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Registration;
