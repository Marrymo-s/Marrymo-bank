'use client'

import * as styles from '../index.css'
import Button from '@/components/Button';
import React, {useState, useEffect} from 'react';
import {usesAccountWhoStore} from '@/store/useAccountWho';

export interface WhoProps {
  who : 'GROOM' | 'BRIDE' | 'BOTH' | null
}

const RegisterEach = ({who}: WhoProps) => {
  const [isDone, setIsDone] = useState<{[key in 'GROOM' | 'BRIDE'] ?: boolean}>({})
  const {setWho} = usesAccountWhoStore()

  useEffect(() => {
    setWho(who)
  }, [who, setWho])

  const handleOpenBanking = (role: 'GROOM' | 'BRIDE') => {
    window.location.href = `${process.env.NEXT_PUBLIC_OPENBANKING_URI as string}&role=${role}`
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
          disabled={!!isDone[role]}
          onClick={() => {
            handleOpenBanking(role)
          }}
        >
          {isDone[role] ? '인증 완료' : '인증'}
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