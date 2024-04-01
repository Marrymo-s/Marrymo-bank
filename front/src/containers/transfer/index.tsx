'use client';
import React, {useState} from 'react';
import Header from '@/components/Header'
import * as styles from './index.css'
import InputBox from '@/components/InputBox';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import {router} from 'next/client';
import {fetchInstance} from '@/services';

const Transfer = () => {
  const [selected, setSelected] = useState<'GROOM' | 'BRIDE'>()
  const [sender, setSender] = useState<string>()
  const [amount, setAmount] = useState<number>()
  const [relationship, setRelationship] = useState<string>()

  const handleChange = (value: 'GROOM' | 'BRIDE') => {
    setSelected(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    setState(e.target.value);
  };
  
  const postMoneygift = async () =>{
    try{
      const requestBody = {
        // userSequence: ,
        // userCode:,
        // wishItemSequence:,
        // guestType: selected,
        // type: ,
        // amount: amount,
        // relationship: relationship,
        // sender: sender,
      }

      const options: RequestInit = {
        method: 'POST',
        // body: JSON.stringify(requestBody)
      }

      const response = await fetchInstance('/moneygift/send', options)

      if(response.ok) {
        router.push('/complete')
      }

    }catch(error) {
      console.error('moneygift 송금 중 오류 발생', error)
    }
  }
  return (
    <>
      <Header title='축의금 보내기' hasPrevious/>
      <main className={styles.transferWrapper}>
        <div>
          <div>
            <InputBox 
              inputBoxHeader='이름'
              placeholder='이름을 입력해주세요.'
              asterisk={true}
              value={sender}
              />
          </div>
          <div>
            <InputBox 
              inputBoxHeader='금액'
              placeholder='보내시는 금액을 입력해주세요'
              asterisk={true}
              />
          </div>
          <div>
            <InputBox 
              inputBoxHeader='관계(선택)'
              placeholder='보내는 분과 어떤 관계인가요?'
              />
          </div>
          <div className={styles.checkInputContainer}>
              누구에게 송금하시겠어요?
              <div className={styles.checkboxContainer}>
              <Checkbox checked={selected === 'GROOM'} onChange={() => handleChange('GROOM')}>신랑</Checkbox>
              <Checkbox checked={selected === 'BRIDE'} onChange={() => handleChange('BRIDE')}>신부</Checkbox>
              </div>
          </div>

        </div>
        

        <Button
          type="button"
          onClick={postMoneygift}
          colorStyle={'roseGold'}
          filled={true}
          size='large'
          disabled={false}
        >
          보내기
        </Button>
      </main>
    </>
  )
}

export default Transfer;
