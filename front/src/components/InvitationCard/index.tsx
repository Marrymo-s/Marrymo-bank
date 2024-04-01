//리액트 라이브러리
'use client'
import React, { useState, useEffect } from 'react';
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
// import { axiosInstance } from '@/services';
import { signupRequest } from '@/types/auth';
import {fetchInstance} from "@/services";

// 폰트
import * as style from '@/styles/font.css';
import {CardGap, rightsText} from '@/components/InvitationCard/index.css';


const InvitationCard = () => {
  const [invitationData, setInvitationData] = useState<signupRequest>({
    groomName: '',
    brideName: '',
    groomContact: '',
    brideContact: '',
    weddingDate: '',
    weddingDay: '',
    weddingTime: '',
    location: '',
    email: '',
    greeting: '',
    groomFather: '',
    groomMother: '',
    brideFather: '',
    brideMother: '',
    imgUrl: [],
  })

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        // 응답 상태가 OK가 아닌 경우, 오류를 던집니다.
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // 응답 본문을 JSON으로 파싱합니다.
      setInvitationData(data); // 파싱된 데이터를 상태에 저장합니다.
    } catch (error) {
      console.error('유저 정보 조회 실패', error);
    }
  };
  console.log(invitationData)
  if (!invitationData) {
    return <div>Loading...</div>
  }

  return (
    <main className={CardGap}>
      <CardTop
        weddingDate={invitationData.weddingDate}
        weddingTime={invitationData.weddingTime}
        imgUrl={invitationData.imgUrl && invitationData.imgUrl[0]}
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
        imgUrl={invitationData.imgUrl && invitationData.imgUrl[0]}
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
