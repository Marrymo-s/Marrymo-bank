import * as styles from './index.css'
import Header from '@/components/Header'

const History = () => {
  return (
    <>
      <Header title='축의금 내역' hasPrevious/>
      <main className={styles.historyWrapper}>
        <div>축의금 내역을 여기에 만들어줘 지원아~</div>
      </main>
    </>
  )
}

export default History;