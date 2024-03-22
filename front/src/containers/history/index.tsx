import * as styles from './index.css'
import Header from '@/components/Header'
import Checkboxes from "@/containers/history/Checkboxes";

const History = () => {
  return (
    <>
      <Header title='축의금 내역' hasPrevious/>
      <main className={styles.historyWrapper}>
        <div>
            <Checkboxes />
        </div>
      </main>
    </>
  )
}

export default History;