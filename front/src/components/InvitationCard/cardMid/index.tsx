import * as styles from './index.css';
import React from 'react';
import { signupRequest } from '@/types/auth';
import {cardMidContactText, cardMidContactWrapper, cardMidFamilyText} from './index.css';

type CardMidProps = Pick<signupRequest,  // 이거 길어지면 이렇게 하는거 맞나?
  'groomFather' |
  'groomMother' |
  'groomName' |
  'brideFather' |
  'brideMother' |
  'brideName' |
  'groomContact' |
  'brideContact'
>;

const cardMid = ({
  groomFather,
  groomMother,
  groomName,
  brideFather,
  brideMother,
  brideName,
  groomContact,
  brideContact
}: CardMidProps) => {
  return (
    <div className={styles.cardMidWrapper}>
      <div className={styles.cardMidText}>
        <span className={styles.cardMidFamilyText}>{groomFather} / {groomMother}</span>의 아들 <span className={styles.cardMidFamilyText}>{groomName}</span>
      </div>
      <div className={styles.cardMidText}>
        <span className={styles.cardMidFamilyText}>{brideFather} / {brideMother}</span>의  딸   <span className={styles.cardMidFamilyText}>{brideName}</span>
      </div>
      <div className={cardMidContactWrapper}>
        <div className={cardMidContactText}>신랑 연락처 : {groomContact}</div>
        <div className={cardMidContactText}>신부 연락처 : {brideContact}</div>
      </div>
    </div>
  )
}

export default cardMid;