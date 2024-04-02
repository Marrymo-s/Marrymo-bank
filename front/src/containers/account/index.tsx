import * as styles from './index.css';
import Header from "@/components/Header";
import AccountWhoCheck from "@/containers/account/AccountWhoCheck";

const Account = () => {
  return (
    <>
      <Header title='계좌 등록하기' hasPrevious/>
      <main className={styles.accountWrapper}>
        <div className={styles.accountContentWrapper}>
          <h2 className={styles.accountContentStyle}>계좌는 왜 등록하나요?</h2>
          <div className={styles.accountContentStyle}>- 메리모는 고객님 만든 모바일 청첩장에 사용할 계좌 번호가 필요해요.</div>
          <div className={styles.accountContentStyle}>- 메리모는 <strong>금융 결제원의 오픈API</strong>와 <strong>카카오페이 송금하기 서비스</strong>를 연동해 고객님의 <strong>축의금을 안전하게 관리</strong>해요.</div>
          <div className={styles.accountContentStyle}>- 지인들이 메리모를 통해 보내주신 축의금을 결혼식 당일에 고객님의 계좌 번호로 송금해드려요.</div>
        </div>
        <div>누구 계좌로 송금해드릴까요?</div>
        <AccountWhoCheck />
      </main>
    </>
  )
}

export default Account;
