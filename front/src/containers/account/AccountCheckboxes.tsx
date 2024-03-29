'use client'

import React, { useState } from 'react'
import * as styles from './index.css'
import Checkbox from '@/components/Checkbox'
import {historyResponse} from "@/types/history";

const Checkboxes = () => {
  const [selected, setSelected] = useState<'GROOM' | 'BRIDE' | 'BOTH'>();

  const handleChange = (value: 'GROOM' | 'BRIDE' | 'BOTH') => {
    setSelected(value);
  }

  const postAccountWho = async () => {
    try {
      const requestBody  = {
        who: selected
      }

      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(requestBody)
      }

      await fetch('/users/account/who', options).then((res) => res)

    } catch(error) {
      console.error('moneygift history get중 오류 발생', error)
    }
  }

  return (
    <>
      <div className={styles.checkboxesContainer}>
        <Checkbox checked={selected === 'GROOM'} onChange={() => handleChange('GROOM')}>신랑</Checkbox>
        <Checkbox checked={selected === 'BRIDE'} onChange={() => handleChange('BRIDE')}>신부</Checkbox>
        <Checkbox checked={selected === 'BOTH'} onChange={() => handleChange('BOTH')}>신랑 신부 각각</Checkbox>
      </div>
    </>
  )
}

export default Checkboxes;