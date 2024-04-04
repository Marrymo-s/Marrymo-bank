'use client';

import React, { use, useState, useEffect } from 'react';
import {fetchInstance} from "@/services";

import Header from "@/components/Header";
import Button from '@/components/Button'
import * as styles from './index.css';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import { useParams } from 'next/navigation';

import { useWishitemSeqStore } from '@/store/useWishitemSeq';

import ProgressBar from '@/containers/detail/ProgressBar';
import {detailColorText, detailTotalPriceText} from "./index.css";

import {formatPrice} from '@/utils/format';
import {userInfoStore} from "@/store/useUserInfo";


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
  const router = useRouter()
  const setWishitemSeq = useWishitemSeqStore((state) => state.setWishitemSeq);
  setWishitemSeq(Number(wishItemSequence))
  const wishItemDetailData = await fetchInstance(`/wish-item/${userCode}/${wishItemSequence}`) as wishItemDetailProps

  const formattedPrice = formatPrice(String(wishItemDetailData.price));
  const formattedFund = formatPrice(String(wishItemDetailData.fund));

  const handleButtonClick = () => {
    router.push('/transfer');
  }

  return (
    <>
      {/*<div>유저{userCode} 제품{wishItemSequence}</div>*/}
      <Header title="위시리스트 상세" hasPrevious/>
      <main className={styles.detailWrapper}>
        <div className={styles.detailImageWrapper}>
          <Image
            src={wishItemDetailData.img}
            alt="cardTopImage"
            width={400}
            height={400}
            sizes='100vw'
          />
        </div>
        <hr />
        <div className={styles.detailNameText}>
          {wishItemDetailData.name}
        </div>
        <div>
          <ProgressBar fund={wishItemDetailData.fund} price={wishItemDetailData.price}/>
        </div>
        <hr/>
        <div>
          <div>
            현재 &nbsp;<span className={styles.detailTotalPriceText}>
                  {formattedPrice}
                </span> 중 <br/>
            <span className={styles.detailPartialPriceText}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formattedFund}
            </span> 원이 모였어요 <br/>
            모금 마감까지&nbsp;
            {/*<span className={styles.detailColorText}>*/}
            {/*   n*/}
            {/*</span> 일이 남았어요! <br/>*/}
            지금까지&nbsp;
            <span className={styles.detailColorText}>
              {wishItemDetailData.person}
            </span> 명이 모금에 참여했어요
          </div>
        </div>
        <Button
          onClick={handleButtonClick}
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
