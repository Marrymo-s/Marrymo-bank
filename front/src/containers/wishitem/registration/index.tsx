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
  trigger: boolean;
  userCode: string;
}

const Registration = ({ trigger, userCode}: RegistrationProps) => {
  const [wishLists, setWishLists] = useState<WishListItem[]>([]);
  const router = useRouter();
  const wishLen = wishLists.length

  useEffect(() => {
    console.log(`userCode: ${userCode}`)
    if (userCode) {
      (async () => {
        try {
          console.log(trigger)
          const response = await fetchInstance(`/wish-item/${userCode}`);
          // console.log(response)
          setWishLists([...response.items].reverse());

        } catch (error) {
          console.error('조회실패')
        }
      })();
    } else {
      console.log('userCode is not defined yet.');
    }
  }, [trigger])

  const goToDetail = (num: number) => {
    router.push(`detail/${userCode}/${num}`);
  };

  return (
    <div className={styles.registrationContainer}>
      <h3>나의 WISHLIST</h3>
      <div className={styles.registrationOuterWrapper}>
        <div className={styles.registrationInnerWrapper}>
          {wishLists.map((wishlist, index) => (
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
