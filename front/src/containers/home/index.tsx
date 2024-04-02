
'use client';

import React, { use, useState, useEffect } from 'react';

import * as styles from './index.css'
import InvitationCard from "@/components/InvitationCard";
import HamburgerButton from '@/containers/home/HamburgerButton';
import {userInfoStore} from "@/store/useUserInfo";
import { signupRequest } from '@/types/auth';

// import { axiosInstance } from '@/services';
// const userCode = userInfoStore((state) => state.userCode);

import { fetchInstance } from "@/services";



const Home = () => {
  return (
    <>
      <main className={styles.homeWrapper}>
        <HamburgerButton />
        <div className={styles.invitationContainer}>
          <InvitationCard />
        </div>
      </main>
    </>
  )
}

export default Home;

