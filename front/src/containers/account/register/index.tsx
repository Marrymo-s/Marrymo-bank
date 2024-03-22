import * as styles from '../index.css'
import Header from '@/components/Header';

const accountRegister = () => {
  return (
    <>
      <Header title='계좌 등록하기' hasPrevious/>
      <main className={styles.accountWrapper}>
        계좌 등록하기 페이지
      </main>
    </>
  )
}

export default accountRegister;