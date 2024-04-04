// TODO: 위시카드
import React, { use } from 'react';
import * as styles from './index.css';
import Image from 'next/image';
import {formatPrice} from '@/utils/format';
import Button from '@/components/Button';
import {commonButton} from '@/components/Button/index.css';
import { signupRequest } from '@/types/auth';
import { fetchInstance } from "@/services";
import wishlist from '@/components/InvitationCard/wishlist';


// 여기 페이지 타입들 수정하기

interface WishCardProps {
  title: string;
  image: string;
  lprice: string;
  brand: string;
  category2: string;
  category4: string;
  refreshData: () => void;
}

interface myWishProps {
  name: string;
  img: string;
  price: string;
}

const WishCard = ({image, title, lprice, brand, category2, category4, refreshData}: WishCardProps) => {

  const formattedPrice = formatPrice(lprice);
  // const userCode = userInfoStore((state) => state.userCode);
  // 위시 아이템 카드에서 버튼 누르면 wish-item에 등록
  const handleClick = async () => {
    const myWish = {
      name: title,
      img: image,
      price: lprice,
    };
    const options : RequestInit = {
      method: 'POST',
      body: JSON.stringify(myWish)
    }

    const response = await fetchInstance(`/wish-item`, options)
    refreshData()
    console.log(response)
    // 요청 성공시 커스텀 이벤트 발생시키기

  }

  return (
    <div className={styles.WishCardWrapper}>
      <Image
        src={image}
        width={150} // 이미지의 실제 너비를 넣으세요.
        height={150} // 이미지의 실제 높이를 넣으세요.
        alt="위시리스트 아이템 이미지"
      />
      <hr/>
      <div className={styles.WishCardTextWrapper}>
        <div className={styles.WishCardBrandText}>{brand}</div>
        <div className={styles.WishCardTitleText}>{title}</div>
        <div>
          <span className={styles.WishCardLpriceText}>{formattedPrice}</span>원
        </div>
        <div className={styles.WishCardCategoryText}>{category2}-{category4}</div>
      </div>
      <Button
        type='button'
        size='small'
        colorStyle={'roseGold'}
        filled={true}
        onClick={handleClick}

      >
        담기
      </Button>
    </div>
  )
}

export default WishCard;
