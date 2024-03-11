// TODO: 헤더
'use client'
import { useRouter } from 'next/navigation';
// import 이미지 from 이미지출처 // 여기서 < 모양 이미지 가져오기

interface Props {
  title: string;
  hasPrevious?: boolean;
}
const Header = ({ title, hasPrevious }: Props) => {
  const router =useRouter();

  return (
    // className 먹이기
    <nav>
      <div>헤더</div>
      {hasPrevious ? (
        <button
          type='button'
          // className={styles.previousButton}
          onClick={() => router.back()}
          aria-label='뒤로가기'
        >
         뒤로가
        </button>
      ) : (
        <div/>
      )}
      <div>{title}</div>
      {/*className먹이기*/}
    </nav>
  )
}

export default Header
