'use client';

import Header from "@/components/Header";
import Button from '@/components/Button';
import Search from '@/containers/wishitem/search';
import Registration from '@/containers/wishitem/registration';
import Results from '@/containers/wishitem/results';

import * as styles from './index.css';

const WishItem = () => {
  return (
    <>
      <Header title="위시리스트" hasPrevious/>
      <div className={styles.wishitemContainer}>
        <Search />
        <Registration />
        <Results />
      </div>
    </>
  )
}

export default WishItem;
