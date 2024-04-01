'use client'

import * as styles from '../index.css'
import Button from '@/components/Button';
import React, {useState, useEffect} from 'react';
import {usesAccountWhoStore} from '@/store/useAccountWho';

export interface WhoProps {
  who : 'GROOM' | 'BRIDE' | 'BOTH' | null
}

const RegisterEach = ({who}: WhoProps) => {
  const [isDone, setIsDone] = useState<boolean>(false)
  const {setWho} = usesAccountWhoStore()

  useEffect(() => {
    setWho(who)
  }, [who, setWho])
23
  const handleOpenBanking = () => {
    window.location.href = process.env.NEXT_PUBLIC_OPENBANKING_URI as string
  }

  const renderWho = (text: string) => (
    <div className={styles.registEach}>
      <div>
        {text} 계좌 번호 등록
      </div>
      <Button
        type='button'
        size='small'
        colorStyle='roseGold'
        filled={true}
        disabled={isDone}
        onClick={() => {
          handleOpenBanking()
        }}
      >
        {isDone ? '인증 완료' : '인증'}
      </Button>
    </div>
  )

  return (
    <>
      <main className={styles.accountWrapper}>
        {who === 'BOTH' ? (
          <>
            {renderWho('신랑')}
            {renderWho('신부')}
          </>
        ) : renderWho(who === 'GROOM' ? '신랑' : '신부')}
      </main>
    </>
  )
}

export default RegisterEach;