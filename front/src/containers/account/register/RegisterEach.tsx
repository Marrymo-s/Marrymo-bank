'use client'

import * as styles from '../index.css'
import Button from '@/components/Button';
import React, {useState} from 'react';

export interface WhoProps {
  who : 'GROOM' | 'BRIDE' | 'BOTH' | null
}

const RegisterEach = ({who}: WhoProps) => {
  const [isDone, setIsDone] = useState<boolean>(false);

  const handleOpenBanking = () => {
    window.location.href = "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=fe57b880-6b09-4967-b74a-dd9b09d5bf62&redirect_uri=https://marrymo.site/open-banking&scope=login inquiry transfer&state=b80BLsfigm9OokPTjy03elbJqRHOfGSY&auth_type=0"
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
        인증
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