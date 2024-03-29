'use client'

import * as styles from '../index.css'
import Header from '@/components/Header';
import {useSearchParams} from 'next/navigation';
import RegisterEach from '@/containers/account/register/RegisterEach';

const AccountRegister = () => {
  const searchParams = useSearchParams()
  const search  = searchParams.get('who')

  // 검증 함수: search가 유효한 타입인지 확인
  const validateSearchParam = (param: string | null): 'GROOM' | 'BRIDE' | 'BOTH' | null => {
    const validValues = ['GROOM', 'BRIDE', 'BOTH'];
    if(param == null) {
      return null
    }
    return validValues.includes(param) ? param as 'GROOM' | 'BRIDE' | 'BOTH' : null;
  };

  const validatedSearch = validateSearchParam(search);

  return (
    <>
      <Header title='계좌 등록하기' hasPrevious/>
      <main className={styles.accountWrapper}>
        <div><h2>계좌 등록하기</h2></div>
        <RegisterEach who={validatedSearch} />
      </main>
    </>
  )
}

export default AccountRegister;