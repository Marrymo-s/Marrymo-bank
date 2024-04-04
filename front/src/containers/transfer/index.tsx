import Header from '@/components/Header'
import * as styles from './index.css'

const Transfer = () => {
  return (
    <>
      <Header title='축의금 보내기' hasPrevious/>
      <main className={styles.transferWrapper}>
        <div>축의금 보내는 코드를 여기에 작성해주세요.</div>
      </main>
    </>
  )
}

export default Transfer;
