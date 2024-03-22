import * as styles from './index.css';
import Header from '@/components/Header';

const Withdrawal = () => {
  return (
    <>
      <Header title='회원 탈퇴' hasPrevious/>
      <main className={styles.withdrawalWrapper}>
        <div>이곳에 회원 탈퇴 페이지 코드를 짜면 됩니다.</div>
      </main>
    </>
  )
}

export default Withdrawal;
