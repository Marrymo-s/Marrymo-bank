'use client';

import React, {useState, useEffect} from 'react';
import * as styles from './index.css';
import {useRouter} from 'next/navigation';
import useModal from '@/hooks/useModal';
import {logout} from '@/services/home';
import {HamburgerBar, IconRightBracket, IconClose, CopyLink} from '#/svgs';
import Link from 'next/link';
import Button from '@/components/Button';


const HamburgerButton = () => {
  // 세션 스토리지에서 초기 상태를 가져오는 것으로 수정. 상태가 없으면 기본값 false
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = sessionStorage.getItem('hamburgerMenuOpen');
      return savedState === 'true';
    }
    return false;
  });

  useEffect(() => {
    // isOpen 상태가 변경될 때마다 세션 스토리지에 저장
    sessionStorage.setItem('hamburgerMenuOpen', isOpen.toString());
  }, [isOpen]);

  const router = useRouter();
  const {openModal, Modal} = useModal();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        console.log('주소가 클립보드에 복사되었습니다.');
      },
      (err) => {
        console.error('주소를 복사하는 데 실패했습니다:', err);
      },
    );
  };

  return (
    <div>
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        <HamburgerBar />
      </button>
      {isOpen && (
        <div className={
          isOpen
            ? `${styles.hamburgerMenuTab} ${styles.hamburgerMenuTabActive}`
            : `${styles.hamburgerMenuTab} ${styles.hamburgerMenuTabInactive}`
        }>
          <div className={styles.menuHeader}>
            <div className={styles.greeting}>
              안녕하세요
              <br />
              {/*TODO: Home에서 신랑, 신부 이름 prop 받아서 띄워주기*/}
              {/*{groomName} {brideName}님*/}
            </div>
            <button className={styles.copyButton} onClick={copyLink}>
              <div className={styles.copyContent}>
                <CopyLink />
                <span className={styles.copyText}>복사하기</span>
              </div>
            </button>
            <button className={styles.closeButton} onClick={toggleMenu}>
              <IconClose />
            </button>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={toggleMenu}
          >
            <IconClose />
          </button>
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
            href="/withdrawal"
            className={styles.hamburgerListContent}>
            <div>회원 탈퇴</div>
            <IconRightBracket />
          </Link>
          <hr className={styles.hamburgerBarSeperateLine} />
          <div className={styles.contactText}>
            연락 문의: official.marrymo@gmail.com
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerButton;