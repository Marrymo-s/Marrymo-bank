'use client';

import React, { use, useState, useEffect } from 'react';

import Header from "@/components/Header";
import Button from '@/components/Button'
import * as styles from './index.css';
import Image from 'next/image';

import { useParams } from 'next/navigation';
import { axiosInstance } from '@/services';

interface wishItemDetailProps {
  wishItemSequence: number;
  name: string;
  fund: number;
  price: number;
  img: string
}


const Detail = () => {
  const { userCode, wishItemSequence } = useParams()

  const getWishItemDetail = axiosInstance.get<wishItemDetailProps>(`/wish-item/${userCode}/${wishItemSequence}`)
  const wishItemDetailData = use(getWishItemDetail)

  return (
    <>
      {/*<div>유저{userCode} 제품{wishItemSequence}</div>*/}
      <Header title="위시리스트 상세" hasPrevious/>
      <main className={styles.detailWrapper}>
        <div className={styles.detailContainer}>
          <Image
            src='/images/landing/example1.png'
            alt="cardTopImage"
            width={300}
            height={300}
            sizes='100vw'
          />
        </div>
        <hr />
        <div className={styles.detailNameText}>
          {wishItemDetailData.data.name}
        </div>
        <div>
          프로그레스 바.
        </div>
        <hr/>
        <div>
          <div>
            현재 <span>{wishItemDetailData.data.price}</span> 중 <br />
            <span>{wishItemDetailData.data.fund}</span>원이  모였어요
            모금 마감까지  <span>n</span>일이 남았어요! <br />
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
