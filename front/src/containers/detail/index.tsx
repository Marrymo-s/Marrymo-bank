'use client';

import React, { use, useState, useEffect } from 'react';
import {fetchInstance} from "@/services";

import Header from "@/components/Header";
import Button from '@/components/Button'
import * as styles from './index.css';
import Image from 'next/image';

import { useParams } from 'next/navigation';

interface wishItemDetailProps {
  wishItemSequence: number;
  name: string;
  fund: number;
  person: number;
  price: number;
  img: string
}


const Detail = async () => {
  const { userCode, wishItemSequence } = useParams()


  const wishItemDetailData = await fetchInstance(`/wish-item/${userCode}/${wishItemSequence}`) as wishItemDetailProps
  console.log(wishItemDetailData)

  return (
    <>
      {/*<div>유저{userCode} 제품{wishItemSequence}</div>*/}
      <Header title="위시리스트 상세" hasPrevious/>
      <main className={styles.detailWrapper}>
        <div className={styles.detailContainer}>
          <Image
            src={wishItemDetailData.img}
            alt="cardTopImage"
            width={300}
            height={300}
            sizes='100vw'
          />
        </div>
        <hr />
        <div className={styles.detailNameText}>
          {wishItemDetailData.name}
        </div>
        <div>
          프로그레스 바.
        </div>
        <hr/>
        <div>
          <div>
            현재 <span>{wishItemDetailData.price}</span> 중 <br />
            <span>{wishItemDetailData.fund}</span>원이  모였어요 <br />
            모금 마감까지  <span>n</span>일이 남았어요! <br />
            지금까지 <span>{wishItemDetailData.person}</span>명이 모금에 참여했어요
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
