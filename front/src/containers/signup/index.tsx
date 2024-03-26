'use client';

import Header from '@/components/Header'
import * as styles from './index.css'
import dynamic from "next/dynamic";
import WeddingDatepicker from "@/containers/signup/WeddingDatepicker";
import InputBox from "@/components/InputBox";
import InvitationMessage from "@/containers/signup/InvitationMessage";
import Button from '@/components/Button/index'
import {useRouter} from 'next/navigation';

const KakaoNoSSR = dynamic(() => import('./KakaoMap'), {
  ssr: false,
})

const Signup = () => {
  const searchKeyword: string = '바나프레소 테헤란로점'  // 임시 데이터
  const router = useRouter()

  return (
    <>
      <Header title={'개인 정보 입력'} hasPrevious/>
      <main className={styles.signupWrapper}>
        <div>
          <InputBox
            inputBoxHeader='신랑 이름'
            placeholder='신랑 이름을 입력하세요.'
            asterisk={true}/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='신랑 아버지 이름'
            placeholder='신랑 아버지 이름을 입력하세요.'/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='신랑 어머니 이름'
            placeholder='신랑 어머니 이름을 입력하세요.'/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='신부 이름'
            placeholder='신부 이름을 입력하세요.'
            asterisk={true}/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='신부 아버지 이름'
            placeholder='신부 아버지 이름을 입력하세요.'/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='신부 어머니 이름'
            placeholder='신부 어머니 이름을 입력하세요.'/>
        </div>
        {/*TODO: 연락처 error message - 숫자형식만 받기(숫자 형식이 아니면 에러 메시지 */}
        <div>
          <InputBox
            inputBoxHeader='신랑 연락처'
            placeholder='신랑 연락처를 입력하세요.'
            asterisk={true}/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='신부 연락처'
            placeholder='신부 연락처를 입력하세요.'
            asterisk={true}/>
        </div>
        <div>
          <InvitationMessage/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='이메일 주소'
            placeholder='이메일 주소를 입력하세요.'
            asterisk={true}
            // 버튼은 아래와 같이 'text', 'onClick', 'type'이 있어야 에러가 나지 않아요
            button={{
              text: '인증',
              // 추후에 인증 메일 보내는 함수 작성
              onClick: () => {
              },
              type: 'button',
              size: 'small'
            }}
          />
        </div>
        <div>
          {/*TODO: 인증번호가 일치하면 safeGreen 색깔로 안내 문구 뜨게 만들기*/}
          <InputBox
            inputBoxHeader='인증 번호 입력'
            placeholder='인증 번호를 입력해주세요.'
            asterisk={true}
          />
        </div>
        <div className={styles.weddingDatePickerContainer}>
          <div>
            결혼식 일자 선택
            <span className={styles.asteriskStyle}>*</span>
          </div>
          <div>
            <WeddingDatepicker/>
          </div>
        </div>
        <div>
          {/*<KakaoNoSSR searchKeyword={searchKeyword}/>*/}
        </div>
        <div>
          {/*TODO: */}
          <Button
            onClick={() => {
              router.push('/preview')
            }}
            type='button'
          >다음</Button>
        </div>
      </main>
    </>
  )
}

export default Signup;