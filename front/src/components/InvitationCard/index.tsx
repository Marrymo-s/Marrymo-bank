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
import { userInfoStore } from '@/store/useUserInfo';

// 폰트
import * as style from '@/styles/font.css';
import {CardGap, rightsText} from '@/components/InvitationCard/index.css';

type Props = {
  params: { userCode: string};
  setIsMem: (isMem: boolean) => void
}


const InvitationCard = ({params, setIsMem}:Props) => {
  const [loading, setLoading] = useState<boolean>(true);
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
    isMem: false,
  })

  const { userCode } = params;

  console.log("invitation",userCode)
  useEffect(() => {
    console.log(`userCode: ${userCode}`); // userCode 값 확인
    if (userCode) {
      (async () => { // 즉시 실행 비동기 함수 사용
        try {
          setLoading(true);
          const response = await fetchInstance(`/users/${userCode}`);
          console.log(response)
          setLoading(false);
          setInvitationData(response); // 상태 업데이트
          setIsMem(response.isMem);

        } catch (error) {
          console.error('유저 정보 조회 실패', error);
          setLoading(false);
        }
      })();
    } else {
      console.log('userCode is not defined yet.');
    }
  }, [userCode, setIsMem]);

  console.log(invitationData)
  console.log(invitationData.isMem)
  if (loading) {
    return <div></div>;
  }

  return (
    <main className={CardGap}>
      <CardTop
        weddingDate={invitationData.weddingDate}
        weddingDay={invitationData.weddingDay}
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
        imgUrl={invitationData.imgUrl && invitationData.imgUrl[1]}
      />
      <Location
        weddingDate={invitationData.weddingDate}
        weddingTime={invitationData.weddingTime}
        location={invitationData.location}
      />
      <Album
        imgUrl={invitationData.imgUrl}
      />
      <Wishlist
        params={{userCode}}
      />
      <div className={rightsText}>
        @Marrymo All rights reserved
      </div>
    </main>
  )
}

export default InvitationCard;
