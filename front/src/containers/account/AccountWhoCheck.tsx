'use client'

import React, { useState } from 'react'
import * as styles from './index.css'
import Checkbox from '@/components/Checkbox'
import Button from "@/components/Button";
import {useRouter, useSearchParams} from 'next/navigation';
import {fetchInstance} from '@/services';

const Checkboxes = () => {
  const [selected, setSelected] = useState<string>();
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (value: string) => {
    setSelected(value);
  }

  const postAccountWho = async () => {
    try {
      const requestBody  = {
        who: selected
      }

      const options: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify(requestBody)
      }

      const curSearchParams = new URLSearchParams(searchParams.toString())
      if(selected) {
        curSearchParams.set('who', selected)
      } else {
        curSearchParams.delete('who')
      }

      const urlParams = curSearchParams.toString()

      console.log(urlParams)

      //url 생성하고, 페이지 이동
      router.push(`/account/register?${urlParams}`)

      const response = await fetchInstance('/users/account', options)
      console.log(response);
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

      <Button
        type='button'
        size='large'
        colorStyle='roseGold'
        filled={true}
        disabled={!selected}
        onClick={() => postAccountWho()}
      >
        다음
      </Button>
    </>
  )
}

export default Checkboxes;