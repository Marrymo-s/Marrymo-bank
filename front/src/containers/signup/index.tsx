import Header from '@/components/Header'
import * as styles from './index.css'
import dynamic from "next/dynamic";
import WeddingDatepicker from "@/containers/signup/WeddingDatepicker";

const KakaoNoSSR = dynamic(() => import('./KakaoMap'), {
  ssr: false,
})

const Signup = () => {
  const searchKeyword: string = '바나프레소 테헤란로점'
  return (
    <>
      <Header title={'개인 정보 입력'} hasPrevious/>
      <main className={styles.signupWrapper}>
        개인정보 입력하는 곳<br/>
        결혼식 일자 선택
        <WeddingDatepicker />
        {/*TODO: 카카오 맵이 안 뜨는 이슈 해결*/}
        <KakaoNoSSR searchKeyword={searchKeyword}/>
      </main>
    </>
  )
}

export default Signup;