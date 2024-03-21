import * as styles from './index.css';
import React from 'react';
import { signupRequest } from '@/types/auth';

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
      <div>{groomFather} / {groomMother}의 아들 {groomName}</div>
      <div>{brideFather} / {brideMother}의  딸   {brideName}</div>
      <div>신랑 연락처 : {groomContact}</div>
      <div>신부 연락처 : {brideContact}</div>
    </div>
  )
}

export default cardMid;