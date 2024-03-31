'use client'

import InvitationCard from "@/components/InvitationCard";
import Header from "@/components/Header";
import Button from '@/components/Button'
import * as styles from './index.css';

const Preview = () => {
  return (
    <>
      <Header title="청첩장 미리보기" hasPrevious/>
      <main className={styles.previewWrapper}>
        <div className={styles.invitationContainer}>
          <InvitationCard/>
        </div>
        <Button
          type='button'
          size='large'
          colorStyle='roseGold'
          filled={true}
          // onClick={() => router.push('/')}
        >
          홈으로 가기
        </Button>
      </main>
    </>
  )
}

export default Preview;
