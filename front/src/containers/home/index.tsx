
'use client';

import React, { use, useState, useEffect } from 'react';
import * as styles from './index.css'
import InvitationCard from "@/components/InvitationCard";
import HamburgerButton from '@/containers/home/HamburgerButton';
import {userInfoStore} from "@/store/useUserInfo";
import { signupRequest } from '@/types/auth';
import { useParams } from 'next/navigation';
// import { axiosInstance } from '@/services';
// const userCode = userInfoStore((state) => state.userCode);

import { fetchInstance } from "@/services";


type Props = {
  params: { userCode: string}
}

const Home = ({params}: Props) => {
  const { userCode } = useParams() as { userCode:string }
  const setUserCode = userInfoStore((state) => state.setUserCode);
  const [isMem, setIsMem] = useState<boolean>(false); // 상태 추가

  useEffect(() => {
    if (userCode) {
      setUserCode(userCode);
      console.log(userCode)
    }
  }, [userCode, setUserCode, isMem]);

  const updateIsMem = () => {
    setIsMem(!isMem);
  };
  console.log(isMem)
  return (
    <>
      <main className={styles.homeWrapper}>
        {isMem && <HamburgerButton />} {/* 조건부 렌더링 */}
        <div className={styles.invitationContainer}>
          {/*<InvitationCard info={info}/>*/}
          <InvitationCard params={{userCode}} updateIsMem={updateIsMem}/>
        </div>
      </main>
    </>
  )
}

export default Home;

