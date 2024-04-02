'use client';

import React, { use, useState, useEffect } from 'react';
import {fetchInstance} from "@/services";

import Header from "@/components/Header";
import Button from '@/components/Button'
import * as styles from './index.css';
import Image from 'next/image';

import { useParams } from 'next/navigation';

import ProgressBar from '@/containers/pangpang/ProgressBar';
import {detailColorText, detailImageWrapper, detailTotalPriceText} from "./index.css";

import {formatPrice} from '@/utils/format';


// interface wishItemDetailProps {
//   wishItemSequence: number;
//   name: string;
//   fund: number;
//   person: number;
//   price: number;
//   img: string
// }


const Test = async () => {
  // const { userCode, wishItemSequence } = useParams()

  // const wishItemDetailData = await fetchInstance(`/wish-item/${userCode}/${wishItemSequence}`) as wishItemDetailProps
  // console.log(wishItemDetailData)

  const formattedPrice = formatPrice(String(1000000));
  const formattedFund = formatPrice(String(10000));
  const testImage = '/images/landing/example1.png';

  return (
    <>
      <Header title="위시리스트 상세" hasPrevious/>
      <main className={styles.detailWrapper}>
        <div className={styles.detailImageWrapper}>
          <Image
            src={testImage}
            alt="cardTopImage"
            width={480}
            height={480}
            sizes='100vw'
            className={styles.detailImageContainer}
          />
        </div>
        <hr />
        <div className={styles.detailNameText}>
          삼성전자삼성전자삼
        </div>
        <div>
          <ProgressBar fund={10} price={100}/>
        </div>
        <hr/>
        <div>
          <div>
            현재 &nbsp;<span className={styles.detailTotalPriceText}>
                  {formattedPrice}
                </span> 중 <br />
            <span className={styles.detailPartialPriceText}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formattedFund}
            </span> 원이  모였어요 <br />
            모금 마감까지&nbsp;
            <span className={styles.detailColorText}>
               n
            </span> 일이 남았어요! <br />
            지금까지&nbsp;
            <span className={styles.detailColorText}>
              2
            </span> 명이 모금에 참여했어요
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

export default Test;
