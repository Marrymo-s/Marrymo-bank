// TODO: 위시카드
import React from 'react';
import * as styles from './index.css';
import Image from 'next/image';
import {formatPrice} from '@/utils/format';
import Button from '@/components/Button';
import {commonButton} from '@/components/Button/index.css';


interface WishCardProps {
  title: string;
  image: string;
  lprice: string;
  brand: string;
  category2: string;
  category4: string;
}

const WishCard = ({image, title, lprice, brand, category2, category4}: WishCardProps) => {
  const formattedPrice = formatPrice(lprice);

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
      >
        담기
      </Button>
    </div>
  )
}

export default WishCard;
