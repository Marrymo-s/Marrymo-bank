import * as styles from './index.css';
import Header from "@/components/Header";

const Account = () => {
  return (
    <>
      <Header title='계좌 등록하기' hasPrevious/>
      <main className={styles.accountWrapper}>
        <div>계좌 등록하는 페이지</div>
      </main>
    </>
  )
}

export default Account;
