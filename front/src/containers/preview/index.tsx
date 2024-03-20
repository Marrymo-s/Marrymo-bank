import InvitationCard from "@/components/InvitationCard";
import Header from "@/components/Header";
import Button from '@/components/Button'
import * as styles from './index.css';

const Preview = () => {
  return (
    <>
      <Header title="청첩장 미리보기" hasPrevious/>
      <main className={styles.invitationContainer}>
        <InvitationCard/>
        <Button
          type='button'
          size='large'
          colorStyle='strongRed'
          filled
          // onClick={() => router.push('/')}
        >
          홈으로 가기
        </Button>
      </main>
    </>
  )
}

export default Preview;
