'use client'

import {useRouter} from 'next/navigation';

import IconArrowLeft from '#/svgs/IconArrowLeft.svg';  // '#/*'을 못 찾아서 에러 메시지가 뜸

import * as styles from './index.css'


interface Props {
  title: string;
  hasPrevious?: boolean;
}

const Header = ({title, hasPrevious}: Props) => {
  const router = useRouter();

  return (
    <nav className={styles.headerWrapper}>
      {hasPrevious ? (
        <button
          type='button'
          className={styles.previousButton}
          onClick={() => router.back()}
          aria-label='뒤로가기'
        >
          <IconArrowLeft/>
        </button>
      ) : (
        <div/>
      )}
      <div className={styles.title}>{title}</div>
    </nav>
  )
}

export default Header
