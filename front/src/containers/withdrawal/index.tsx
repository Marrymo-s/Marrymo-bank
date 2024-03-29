'use client';

import React, {useState} from 'react';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import * as styles from './index.css';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';

const Withdrawal = () => {
  const router = useRouter()
  // 체크박스 상태 관리를 위한 상태 변수 선언
  const [agreementChecked, setAgreementChecked] = useState(false);

  const routeToHome = async () => {
    if (!agreementChecked) {
      return
    } else {
      // 탈퇴 동의를 누르면 marrymo home으로 이동합니다.
      await router.push(`/`);
    }
  }
  
  return (
    <>
      <Header title='회원 탈퇴' hasPrevious/>
      <main className={styles.withdrawalWrapper}>
        <div className={styles.withdrawalTitle}>회원탈퇴 전 반드시 숙지해주세요</div>
        <div className={styles.withdrawalDetail}>1. 탈퇴 즉시 모바일 청첩장 페이지는 만료됩니다.<br />
          &nbsp; &nbsp;이로 인해 청첩장에 접근이 불가능해지므로, 필요한<br />
          &nbsp; &nbsp;정보는 사전에 확인하시길 바랍니다.<br />
          2. 탈퇴 시점까지 모인 축의금은 탈퇴 다음 날 오전 3시에<br />
          &nbsp; &nbsp;고객이 등록한 계좌로 송금됩니다. 여러 계좌를 등록한<br />
          &nbsp; &nbsp;경우, 각 계좌로 분할 송금됩니다.<br />
          3. 송금 내역은 등록한 이메일 주소로 파일 형태로<br />
          &nbsp; &nbsp;전송됩니다. 송금 과정이나 결과에 대해 문서화된 증빙을<br />
          &nbsp; &nbsp;원하시는 경우, 해당 메일을 확인하시기 바랍니다.<br />
          4. 메리모는 환급 과정에서 발생할 수 있는 법적 책임을<br />
          &nbsp; &nbsp;지지 않습니다. 모든 환급 절차는 관련 법규와 규정을<br />
          &nbsp; &nbsp;준수하며 진행됩니다.
        </div>
        <div className={styles.checkboxWrapper}>
          <Checkbox checked={agreementChecked} onChange={() => {
            setAgreementChecked(!agreementChecked)
          }}>위 탈퇴 약관 내용을 충분히 숙지했고, 탈퇴를<br />진행하겠습니다.</Checkbox>
        </div>
        <Button
          type='button'
          onClick={routeToHome}
          colorStyle={'roseGold'}
          filled={true}
          size='large'
          disabled={!agreementChecked}  // 모든 체크 박스가 선택되지 않으면 비활성화
        >
          회원탈퇴
        </Button>
      </main>
    </>
  )
};

export default Withdrawal;
