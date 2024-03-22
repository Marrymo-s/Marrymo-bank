import React from 'react';
import {searchResponse} from '@/types/search';
import {useRouter} from 'next/navigation';
import * as styles from './index.css';
import Image from 'next/image';
import {registrationContainer} from './index.css';

interface RegistrationProps {
  wishLists: searchResponse[];
}

const Registration = ({wishLists}: RegistrationProps) => {
  const router = useRouter();
  const goToDetail = (productId: string) => {
    router.push(`/wishitem/${productId}`);
  }

  return (
    <div className={styles.registrationContainer}>
      <h3>나의 WISHLIST</h3>
      <div className={styles.registrationOuterWrapper}>
        <div className={styles.registrationInnerWrapper}>
          {wishLists.map((wishlist, index: number) => (
            <div key={wishlist.productId} className={styles.wishlistImageWrapper}>
              <Image
                src={wishlist.image}
                width={90} // 이미지의 실제 너비를 넣으세요.
                height={90} // 이미지의 실제 높이를 넣으세요.
                alt="위시리스트 아이템 이미지"
                onClick={() => goToDetail(wishlist.productId)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Registration;
