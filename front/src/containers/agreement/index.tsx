'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

import Header from '@/components/Header';
import Button from '@/components/Button';
import * as styles from '@/containers/agreement/index.css';
import Checkbox from '@/components/Checkbox';
import {userInfoStore} from '@/store/useUserInfo';

import TermsOfUse from './TermsOfUse';
import {fetchInstance} from '@/services';

const Agreement = () => {
  const router = useRouter();
  const setUserCode = userInfoStore(state => state.setUserCode);
  // 체크박스 상태 관리를 위한 상태 변수 선언
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  useEffect(() => {
    const fetchUserCode = async () => {
      // fetchInstance 함수를 사용하여 userCode를 가져옴
      const response = await fetch('/users/usercode');
      if (!response.ok) {
        throw new Error('떼잉 ');
      }
      const userCodeText = await response.text();
      console.log(userCodeText)
      setUserCode(userCodeText);
    };
    fetchUserCode();
  }, [setUserCode]);
  // 모든 체크박스가 체크되었는지 확인
  const allChecked = agreementChecked && privacyChecked;

  const routeToSignup = async () => {
    if (!allChecked) {
      // TODO: Modal 컴포넌트를 만들고 나서 약관 동의를 모두 체크해주세요 이런 안내 문구를 띄우기(확인 버튼도)
      // openModal();
    } else {
      // 약관 동의를 두 개 다 동의하면 signup으로 이동
      await router.push(`/signup`);
    }
  };

  return (
    <>
      <Header title="개인 정보 수집 동의" hasPrevious />
      {/*약관 p 태그 안의 내용을 다른 곳으로 옮길 수 있으면 옮기기*/}
      <main className={styles.agreementWrapper}>
        <TermsOfUse />
        {/*TODO: Checkbox 두 개 모두 체크 되었을 때 상태를 store에서 관리하기 (signup, preview 페이지로 접근하려고 할 때 해당 값을 체크 후 안내)*/}
        <div className={styles.checkboxWrapper}>
          <Checkbox checked={agreementChecked} onChange={() => {
            setAgreementChecked(!agreementChecked);
          }}>위 이용 약관 내용에 동의합니다.</Checkbox>
          <Checkbox checked={privacyChecked} onChange={() => {
            setPrivacyChecked(!privacyChecked);
          }}>개인 정보 취급 방침에 동의합니다.</Checkbox>
        </div>
        <Button
          type="button"
          onClick={routeToSignup}
          colorStyle={'roseGold'}
          filled={true}
          size="large"
          disabled={!allChecked}  // 모든 체크 박스가 선택되지 않으면 비활성화
        >
          다음
        </Button>
      </main>
    </>
  );
};

export default Agreement;