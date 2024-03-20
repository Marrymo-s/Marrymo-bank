'use client';
// TODO: 청첩장 카드
import React, { useState, useEffect } from 'react';

import CardTop from '@/components/InvitationCard/cardTop';
import Sentence from '@/components/InvitationCard/sentence';
import CardMid from '@/components/InvitationCard/cardMid';
import Location from '@/components/InvitationCard/location';
import Album from '@/components/InvitationCard/album';
import Wishlist from '@/components/InvitationCard/wishlist';
import CardUnderTop from "@/components/InvitationCard/cardUnderTop";
import { axiosInstance } from '@/services';
import { signupRequest } from '@/types/auth';


// 타입지정하고 값 내려줘야할듯
const InvitationCard = () => {
  const [invitationData, setInvitationData] = useState<signupRequest>({
    groomName: '',
    brideName: '',
    groomContact: '',
    brideContact: '',
    weddingDate: '',
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
    // 여기에서 '/users/1'은 예시입니다. 실제 요청할 엔드포인트를 사용하세요.
    axiosInstance.get<signupRequest>('/users')
      .then(response => {
        // API 응답으로 받은 데이터를 상태에 저장
        setInvitationData(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch invitation data:", error);
        // 에러 처리 로직 (예: 상태 업데이트, 사용자에게 피드백 제공 등)
      });
  }, []);


  return (
    <main>
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
      <hr />
      <Sentence
        greeting={invitationData.greeting}
      />
      <hr />
      <Location
        weddingDate={invitationData.weddingDate}
        weddingTime={invitationData.weddingTime}
        location={invitationData.location}
      />
      <hr />
      <Album />
      <hr />
      <Wishlist />
    </main>
  )
}

export default InvitationCard;
