'use client';

import React, { useState } from 'react';
import * as styles from './index.css';


interface Props {

}
const HamburgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen)
  };

  return (
    <div>
      <button className={styles.hanburgerButton} onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className={styles.hamburgerMenuTab}>
          <div>위시리스트 등록</div>
          <div>계좌 등록</div>
          <div>정보 수정</div>
          <div>축의금 내역</div>
          <div>소개 노션 페이지</div>
          <div>로그아웃</div>
          <div>회원탈퇴</div>
        </div>
      )}
    </div>

  );
};

export default HamburgerButton;
