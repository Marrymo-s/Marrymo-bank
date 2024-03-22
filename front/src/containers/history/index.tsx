import * as styles from './index.css'
import Header from '@/components/Header'
import Checkboxes from "@/containers/history/Checkboxes";
import HistoryList from "@/containers/history/HistoryList";

const History = () => {
  return (
    <>
      <Header title='축의금 내역' hasPrevious/>
      <main className={styles.historyWrapper}>
        <div>
            <Checkboxes />
            <HistoryList />
        </div>
      </main>
    </>
  )
}

export default History;