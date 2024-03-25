import Header from "@/components/Header";
import Button from '@/components/Button'
import * as styles from './index.css';
import Image from 'next/image';
import React from 'react';

const Detail = () => {
  return (
    <>
      <Header title="위시리스트 상세" hasPrevious/>
      <main className={styles.detailWrapper}>
        <div className={styles.detailContainer}>
          <Image
            src='/images/landing/example1.png'
            alt="cardTopImage"
            width={480}
            height={480}
            sizes='100vw'
          />
        </div>
        <div>
          상품명
        </div>
        <div>
          프로그레스 바
        </div>
        <hr/>
        <div>
          <div>
            현재 <span>x</span> 중
            <span>y</span>원이  모였어요
            모금 마감까지  <span>n</span>일이 남았어요
            지금까지 <span>n</span>명이 모금에 참여했어요
          </div>
        </div>
        <Button
          type='button'
          size='large'
          colorStyle='roseGold'
          filled={true}
        >
          펀딩하기
        </Button>
      </main>
    </>
  )
}

export default Detail;
