'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {logout} from '@/services/home';

import * as styles from './index.css';
import {HamburgerBar, IconRightBracket} from '#/svgs';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';

interface Props {

}

const Pangpang = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {openModal, Modal} = useModal();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <div>
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        <HamburgerBar />
      </button>
      <div className={`${styles.hamburgerMenuTab} ${isOpen ? styles.hamburgerMenuTabActive : ''}`}>
        <hr className={styles.hamburgerBarSeperateLine} />
        <Link
          href="/wishitem"
          className={styles.hamburgerListContent}>
          <div>위시리스트 등록</div>
          <IconRightBracket />
        </Link>
        <hr className={styles.hamburgerBarSeperateLine} />
        <Link
          href="/account"
          className={styles.hamburgerListContent}>
          <div>계좌 등록</div>
          <IconRightBracket />
        </Link>
        <hr className={styles.hamburgerBarSeperateLine} />
        <Link
          href="/edit"
          className={styles.hamburgerListContent}>
          <div>정보 수정</div>
          <IconRightBracket />
        </Link>
        <hr className={styles.hamburgerBarSeperateLine} />
        <Link
          href="/history"
          className={styles.hamburgerListContent}>
          <div>축의금 내역</div>
          <IconRightBracket />
        </Link>
        <hr className={styles.hamburgerBarSeperateLine} />
        <div
          role="presentation"
          className={styles.hamburgerListContent}
          onClick={openModal}
        >
          <div>로그아웃</div>
          <IconRightBracket />
        </div>
        <Modal title="로그아웃 하시겠어요?">
          <div className={styles.logoutModalWrapper}>
            <Button
              type="button"
              colorStyle="alertRed"
              filled
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </div>
        </Modal>
        <hr className={styles.hamburgerBarSeperateLine} />
        <Link
          href="/wishitem"
          className={styles.hamburgerListContent}>
          <div>회원 탈퇴</div>
          <IconRightBracket />
        </Link>
        <hr className={styles.hamburgerBarSeperateLine} />
      </div>
    </div>
  );
};
export default Pangpang;