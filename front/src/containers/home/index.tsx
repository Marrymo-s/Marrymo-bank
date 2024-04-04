'use client';

import React, { use, useState, useEffect } from 'react';
import * as styles from './index.css'
import InvitationCard from "@/components/InvitationCard";
import HamburgerButton from '@/containers/home/HamburgerButton';
import {userInfoStore} from "@/store/useUserInfo";
import { signupRequest } from '@/types/auth';
import { useParams } from 'next/navigation';
import Button from '@/components/Button'
// import { axiosInstance } from '@/services';
// const userCode = userInfoStore((state) => state.userCode);
import {useRouter} from 'next/navigation';

import { fetchInstance } from "@/services";
import {NonLoginHomeWrapper, NonLoginInvitationContainer} from "./index.css";


type Props = {
  params: { userCode: string}
}

const Home = ({params}: Props) => {
  const { userCode } = useParams() as { userCode:string }
  const setUserCode = userInfoStore((state) => state.setUserCode);
  const [isMem, setIsMem] = useState<boolean>(false); // 상태 추가

  const router = useRouter()
  setUserCode(userCode);
  // useEffect(() => {
  //   if (userCode) {
  //     setUserCode(userCode);
  //     console.log(userCode)
  //   }
  // }, [userCode, setUserCode]);
  console.log(isMem)

  const handleButtonClick = () => {
    router.push('/transfer');
  }

  return (
    <>
      {isMem ?
        <main className={styles.homeWrapper}>
          <HamburgerButton/>
          <div className={styles.invitationContainer}>
            <InvitationCard params={{userCode}} setIsMem={setIsMem}/>
          </div>
        </main> :
        <main className={styles.NonLoginHomeWrapper}>
          <div className={styles.NonLoginInvitationContainer}>
            <InvitationCard params={{userCode}} setIsMem={setIsMem}/>
          </div>
          <div className={styles.homeButton}>
            <Button
              onClick={handleButtonClick}
              type='button'
              size='large'
              colorStyle='roseGold'
              filled={true}
            >
              축의금 보내기
            </Button>
          </div>
        </main>
      }
    </>
  )
}

export default Home;

