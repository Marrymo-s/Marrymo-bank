'use client';

//리액트 라이브러리
import React, { use, useState, useEffect } from 'react';
import axios from 'axios';

// 구성 컴포넌트
import CardTop from '@/components/InvitationCard/cardTop';
import Sentence from '@/components/InvitationCard/sentence';
import CardMid from '@/components/InvitationCard/cardMid';
import Location from '@/components/InvitationCard/location';
import Album from '@/components/InvitationCard/album';
import Wishlist from '@/components/InvitationCard/wishlist';
import CardUnderTop from "@/components/InvitationCard/cardUnderTop";
import SecondImage from '@/components/InvitationCard/secondImage';

// 기타
import { axiosInstance } from '@/services';
import { signupRequest } from '@/types/auth';

// 폰트
import * as style from '@/styles/font.css';
import {CardGap, rightsText} from '@/components/InvitationCard/index.css';

const invitationData = {
  groomName: '홍길동',
  brideName: '김영희',
  groomContact: '010-1234-5678',
  brideContact: '010-8765-4321',
  weddingDate: '2024-12-24',
  weddingTime: '오후 2시',
  location: '서울 소공동 롯데호텔',
  email: 'wedding@example.com',
  greeting: '초대합니다',
  groomFather: '홍판서',
  groomMother: '춘향이',
  brideFather: '김두한',
  brideMother: '심청이',
  imgUrl: [
    '/images/landing/example1.png',
  ]
};

const InvitationCard = () => {
  //TODO 토큰로직 짜면 쓰기
  // const getSignUpRequest = axiosInstance.get<signupRequest>('/users')
  // const invitationData = use(getSignUpRequest)

  console.log(invitationData)

  return (
    <main className={CardGap}>
      <CardTop
        weddingDate={invitationData.weddingDate}
        weddingTime={invitationData.weddingTime}
        imgUrl={invitationData.imgUrl[0]}
      />
      <CardUnderTop
        groomName={invitationData.groomName}
        brideName={invitationData.brideName}
        weddingDate={invitationData.weddingDate}
        weddingTime={invitationData.weddingTime}
        location={invitationData.location}
      />
      <CardMid
        groomFather={invitationData.groomFather}
        groomMother={invitationData.groomMother}
        groomName={invitationData.groomName}
        brideFather={invitationData.brideFather}
        brideMother={invitationData.brideMother}
        brideName={invitationData.brideName}
        groomContact={invitationData.groomContact}
        brideContact={invitationData.brideContact}
      />
      <Sentence
        greeting={invitationData.greeting}
      />
      <SecondImage
        imgUrl={invitationData.imgUrl[0]}
      />
      <Location
        weddingDate={invitationData.weddingDate}
        weddingTime={invitationData.weddingTime}
        location={invitationData.location}
      />
      <Album
        imgUrl={invitationData.imgUrl}
      />
      <Wishlist />
      <div className={rightsText}>
        @Marrymo All rights reserved
      </div>
    </main>
  )
}

export default InvitationCard;
