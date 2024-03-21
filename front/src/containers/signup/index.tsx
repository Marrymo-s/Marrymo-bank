import Header from '@/components/Header'
import * as styles from './index.css'
import KakaoMap from './KakaoMap'
import dynamic from "next/dynamic";

const KakaoNoSSR = dynamic(() => import('../signup/KakaoMap'), {
    ssr: false,
})

const Signup = () => {
    const searchKeyword = '바나프레소 테헤란로점'
    return (
        <>
            <Header title={'개인 정보 입력'} hasPrevious/>
            <main className={styles.signupWrapper}>
                개인정보 입력하는 곳
                <KakaoNoSSR searchKeyword={searchKeyword}/>
            </main>
        </>
    )
}

export default Signup;