'use client';

import React, {useState, useEffect} from 'react';
import {searchResponse} from '@/types/search';
import {useRouter} from 'next/navigation';
import WishCard from "@/components/WishCard";
import Image from 'next/image';
import * as styles from './index.css';
import {fetchInstance} from '@/services';
import {wishlistContainer, wishlistEachImageWrapper} from "./index.css";


interface WishListItem {
  wishItemSequence: number;
  name: string;
  price: number;
  img: string;
}

type Props = {
  params: { userCode: string}
}

const Wishlist = ({params}:Props) => {
  const { userCode } = params
  const [friendsList, setFriendsList] = useState<WishListItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if(userCode) {
      (async () => {
        try {
          const response = await fetchInstance(`/wish-item/${userCode}`)
          setFriendsList([...response.items].reverse());
        } catch (error){
          console.log('조회실패')
        }
      })();
    } else {
      console.log('userCode is not defined yet.')
    }
  }, [])
  console.log(friendsList)

  const goToDetail = (num: number) => {
    router.push(`/detail/${userCode}/${num}`);
  };

  return (
    <>
      <div>친구가 등록한 위시리스트</div>
      <div>아래 이미지를 클릭하면 후원페이지로 이동할 수 있어요</div>
      <div className={styles.wishlistContainer}>
        {friendsList.map((item, index) => (
          <Image
            key={index}
            src={item.img}
            width={50}
            height={50}
            alt="Picture of the author"
            className={styles.wishlistEachImageWrapper}
            onClick={() => goToDetail(item.wishItemSequence)}
          />
        ))}
      </div>
    </>
  )
}

export default Wishlist;