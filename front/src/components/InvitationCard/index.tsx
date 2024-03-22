

//리액트 라이브러리
import React, { use, useState, useEffect } from 'react';

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
import {rightsText} from '@/components/InvitationCard/index.css';


const InvitationCard = () => {
  const getSignUpRequest = axiosInstance.get<signupRequest>('/users')
  const invitationData = use(getSignUpRequest)

  console.log(invitationData)

  return (
    <main>
      <CardTop
        weddingDate={invitationData.data.weddingDate}
        weddingTime={invitationData.data.weddingTime}
        imgUrl={invitationData.data.imgUrl[0]}
      />
      <CardUnderTop
        groomName={invitationData.data.groomName}
        brideName={invitationData.data.brideName}
        weddingDate={invitationData.data.weddingDate}
        weddingTime={invitationData.data.weddingTime}
        location={invitationData.data.location}
      />
      <CardMid
        groomFather={invitationData.data.groomFather}
        groomMother={invitationData.data.groomMother}
        groomName={invitationData.data.groomName}
        brideFather={invitationData.data.brideFather}
        brideMother={invitationData.data.brideMother}
        brideName={invitationData.data.brideName}
        groomContact={invitationData.data.groomContact}
        brideContact={invitationData.data.brideContact}
      />
      <Sentence
        greeting={invitationData.data.greeting}
      />
      <SecondImage
        imgUrl={invitationData.data.imgUrl[1]}
      />
      <Location
        weddingDate={invitationData.data.weddingDate}
        weddingTime={invitationData.data.weddingTime}
        location={invitationData.data.location}
      />
      <Album
        imgUrl={invitationData.data.imgUrl}
      />
      <Wishlist />
      <div className={rightsText}>
        @Marrymo All rights reserved
      </div>
    </main>
  )
}

export default InvitationCard;
