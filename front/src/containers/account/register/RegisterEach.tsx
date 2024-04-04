
'use client'

import * as styles from '../index.css'
import Button from '@/components/Button';
import React, {useEffect} from 'react';
import {useAccountWhoStore} from '@/store/useAccountWho';
import {useSearchParams} from 'next/navigation';

export interface WhoProps {
  who : 'GROOM' | 'BRIDE' | 'BOTH' | null
}

const RegisterEach = ({who}: WhoProps) => {
  const {setWho, authStatus, setAuthStatus} = useAccountWhoStore()
  const searchParams = useSearchParams()
  const isSuccess  = searchParams.get('success') === 'true'

  useEffect(() => {
    setWho(who)
  }, [who, setWho, isSuccess, setAuthStatus, searchParams])

  const handleOpenBanking = (role: 'GROOM' | 'BRIDE') => {
    // window.location.href = process.env.NEXT_PUBLIC_OPENBANKING_URI as string
    window.location.href = "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=fe57b880-6b09-4967-b74a-dd9b09d5bf62&redirect_uri=https://marrymo.site/open-banking&scope=login inquiry transfer&state=b80BLsfigm9OokPTjy03elbJqRHOfGSY&auth_type=0"
    setAuthStatus(role, true)
  }

  const renderWho = (role: 'GROOM' | 'BRIDE') => {
    const text = role === 'GROOM' ? '신랑' : '신부'
    return (
      <div className={styles.registEach}>
        <div>
          {text} 계좌 번호 등록
        </div>
        <Button
          type='button'
          size='medium'
          colorStyle='roseGold'
          filled={true}
          disabled={authStatus[role]}
          onClick={() => {
            handleOpenBanking(role)
          }}
        >
          {authStatus[role] ? '완료' : '인증'}
        </Button>
      </div>
    )
  }

  return (
    <>
      <main className={styles.accountWrapper}>
        {who === 'BOTH' ? (
          <>
            {renderWho('GROOM')}
            {renderWho('BRIDE')}
          </>
        ) : (who !== null ? renderWho(who) : null)
        }
      </main>
    </>
  )
}

export default RegisterEach;