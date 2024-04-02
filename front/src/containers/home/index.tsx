'use client';

import React, { use, useState, useEffect } from 'react';

import * as styles from './index.css'
import InvitationCard from "@/components/InvitationCard";
import HamburgerButton from '@/containers/home/HamburgerButton';
import {fetchInstance} from '@/services';

// import { axiosInstance } from '@/services';

// 회원가입 완료하고 홈페이지 진입시 주스탠드 userInfo에 유저코드 담기
// 근데 생각해보니까 홈은 뒤에 userCode 붙을 필요 없을 듯

export const generateStaticParams = async () => {
  const userCodes = await fetch('https://spring.marrymo.site/home').then((res) => res.json())
  return userCodes.map((uc: { userCode: { slug: string } }) => ({
    userCode: uc.userCode.slug
  }))
}

const Home = ({params}: {params: {userCode: string}}) => {
  const {userCode} = params

  return (
    <>
      <main className={styles.homeWrapper}>
        <HamburgerButton />
        <div className={styles.invitationContainer}>
          <InvitationCard userCode={userCode}/>
        </div>
      </main>
    </>
  )
}

export default Home;