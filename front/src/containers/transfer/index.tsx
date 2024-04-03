'use client';
import React, {useState} from 'react';
import Header from '@/components/Header'
import * as styles from './index.css'
import InputBox from '@/components/InputBox';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import {fetchInstance} from '@/services';
import {userInfoStore} from '@/store/useUserInfo';
import {useWishitemSeqStore} from '@/store/useWishitemSeq';
import { userSenderStore } from '@/store/useSender'; // userSenderStore 임포트


const Transfer = () => {
  const [selected, setSelected] = useState<'GROOM' | 'BRIDE'>()
  const [sender, setSender] = useState<string>('')
  const [amount, setAmount] = useState<number>()
  const [relationship, setRelationship] = useState<string>('')
  const router = useRouter()

  const updateSenderInStore = userSenderStore((state) => state.setSender);
  //zustand
  const {wishitemSeq} = useWishitemSeqStore()
  const {userCode} = userInfoStore()

  const handleChange = (value: 'GROOM' | 'BRIDE') => {
    setSelected(value)
  }

  const postMoneygift = async () =>{
    updateSenderInStore(sender)
    try{
      const requestBody = {
        userCode: userCode,
        wishItemSequence: wishitemSeq,
        guestType: selected,
        type: wishitemSeq ? 'ITEM' : 'CASH',
        amount: amount,
        relationship: relationship,
        sender: sender,
      }

      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(requestBody)
      }

      const response = await fetchInstance('/moneygift/send', options)

      if(response.payment_url) {
        router.push(response.payment_url)
      } else {
        console.error('payment_url이 안왔어요')
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
              onValueChange={(val) => setSender(val)}

            />
          </div>
          <div>
            <InputBox
              inputBoxHeader='금액'
              placeholder='보내시는 금액을 입력해주세요'
              asterisk={true}
              value={amount ? amount.toString() : ''}
              onValueChange={(val) => setAmount(parseInt(val, 10) || 0)}
            />
          </div>
          <div>
            <InputBox
              inputBoxHeader='관계(선택)'
              placeholder='보내는 분과 어떤 관계인가요?'
              value={relationship || ''}
              onValueChange={(val) => setRelationship(val)}
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

