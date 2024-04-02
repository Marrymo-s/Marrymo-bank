'use client'

import * as styles from '../index.css'
import Header from '@/components/Header';
import {useSearchParams} from 'next/navigation';
import RegisterEach from '@/containers/account/register/RegisterEach';
import Button from '@/components/Button';
import React from 'react';
import {userInfoStore} from '@/store/useUserInfo';
import {router} from 'next/client';
import {useAccountWhoStore} from '@/store/useAccountWho';

const AccountRegister = () => {
  const searchParams = useSearchParams()
  const search  = searchParams.get('who')
  const userCode = userInfoStore((state) => state.userCode);
  const {authStatus} = useAccountWhoStore()

  const redirectHome = () => {
    router.push(`/home/${userCode}`)
  }

  // 검증 함수: search가 유효한 타입인지 확인
  const validateSearchParam = (param: string | null): 'GROOM' | 'BRIDE' | 'BOTH' | null => {
    const validValues = ['GROOM', 'BRIDE', 'BOTH'];
    if(param == null) {
      return null
    }
    return validValues.includes(param) ? param as 'GROOM' | 'BRIDE' | 'BOTH' : null;
  };

  const validatedSearch = validateSearchParam(search);

  //쿼리스트링 who와 zustand의 authStatus 값들을 보고 계좌등록 완료하기 버튼 활성화
  const isAccountDone = () => {
    if(search === 'BOTH' && authStatus['BRIDE'] && authStatus['GROOM']) return true
    else if(search === 'GROOM' && authStatus['GROOM']) return true
    else if(search === 'BRIDE' && authStatus['BRIDE']) return true
    return false
  }

  return (
    <>
      <Header title='계좌 등록하기' hasPrevious/>
      <div className={styles.accountWrapper}>
          <div className={styles.accountRegisterWrapper}>
            <RegisterEach who={validatedSearch} />
          </div>
        <Button
          type='button'
          size='large'
          colorStyle='roseGold'
          filled={true}
          disabled={!isAccountDone()}
          onClick={() => redirectHome()}
        >
          계좌번호 등록하기
        </Button>
      </div>
    </>
  )
}

export default AccountRegister;