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
    setAuthStatus(role, true)
    window.location.href = process.env.NEXT_PUBLIC_OPENBANKING_URI as string
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
          size='small'
          colorStyle='roseGold'
          filled={true}
          disabled={authStatus[role]}
          onClick={() => {
            handleOpenBanking(role)
          }}
        >
          {authStatus[role] ? '인증 완료' : '인증'}
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