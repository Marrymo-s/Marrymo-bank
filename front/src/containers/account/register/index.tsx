'use client'

import * as styles from '../index.css'
import Header from '@/components/Header';
import {useSearchParams} from 'next/navigation';

const AccountRegister = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('who')

  return (
    <>
      <Header title='계좌 등록하기' hasPrevious/>
      <main className={styles.accountWrapper}>
        <div><h2>계좌 등록하기</h2></div>
        {}
      </main>
    </>
  )
}

export default AccountRegister;