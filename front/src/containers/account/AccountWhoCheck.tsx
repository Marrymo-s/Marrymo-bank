'use client'

import React, { useState } from 'react'
import * as styles from './index.css'
import Checkbox from '@/components/Checkbox'
import Button from "@/components/Button";
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

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
        method: 'POST',
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

      const response = await fetch('/users/account/who', options)
      if(response.ok){
        //query-parameter 생성하고, selected 값 추가
        // const curSearchParams = new URLSearchParams(searchParams.toString())
        // if(selected) {
        //   curSearchParams.set('who', selected)
        // } else {
        //   curSearchParams.delete('who')
        // }
        //
        // const urlParams = curSearchParams.toString()
        //
        // console.log(urlParams)
        //
        // //url 생성하고, 페이지 이동
        // router.push(`/register?who=${urlParams}`)
      } else {
        console.error('post error')
      }
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