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


const InvitationCard = async () => {
  const invitationData = await fetchInstance('/users') as signupRequest
  console.log(invitationData)

  // const [invitationData, setInvitationData] = useState<signupRequest>({
  //   groomName: '',
  //   brideName: '',
  //   groomContact: '',
  //   brideContact: '',
  //   weddingDate: '',
  //   weddingDay: '',
  //   weddingTime: '',
  //   location: '',
  //   email: '',
  //   greeting: '',
  //   groomFather: '',
  //   groomMother: '',
  //   brideFather: '',
  //   brideMother: '',
  //   imgUrl: [],
  // })


  // useEffect(() => {
  //   axios.get<signupRequest>('/users')
  //     .then(response => {
  // setInvitationData(response.data);
  //
  //     })
  //     .catch(error => {
  //       console.error("Failed to fetch invitation data:", error);
  //
  //     });
  // }, []);
  if (!invitationData) {
    return <div>Loading...</div>
  }

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
