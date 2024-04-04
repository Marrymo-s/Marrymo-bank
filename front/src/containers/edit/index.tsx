import * as styles from './index.css';
import Header from '@/components/Header';

const Edit = () => {
  return (
    <>
      <Header title='청첩장 정보 수정' hasPrevious/>
      <main className={styles.editWrapper}>
        <div>지원아 프론트로 언제 올거야~~~</div>
      </main>
    </>
  )
}

export default Edit;