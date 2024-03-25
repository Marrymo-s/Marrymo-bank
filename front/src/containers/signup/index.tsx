'use client';

import Header from '@/components/Header'
import * as styles from './index.css'
import dynamic from "next/dynamic";
// import WeddingDatepicker from "@/containers/signup/WeddingDatepicker";
import InputBox from "@/components/InputBox";
import InvitationMessage from "@/containers/signup/InvitationMessage";

const KakaoNoSSR = dynamic(() => import('./KakaoMap'), {
  ssr: false,
})

const Signup = () => {
  const searchKeyword: string = '바나프레소 테헤란로점'
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
        <div><InputBox
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
        /></div>
        결혼식 일자 선택
        {/*<WeddingDatepicker/>*/}
        {/*TODO: 카카오 맵이 안 뜨는 이슈 해결*/}
        <KakaoNoSSR searchKeyword={searchKeyword}/>
      </main>
    </>
  )
}

export default Signup;