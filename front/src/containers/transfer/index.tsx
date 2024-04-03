'use client';
import React, {useState} from 'react';
import Header from '@/components/Header';
import * as styles from './index.css';
import InputBox from '@/components/InputBox';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import {router} from 'next/client';
import {fetchInstance} from '@/services';
import {userInfoStore} from '@/store/useUserInfo';
import {useWishitemSeqStore} from '@/store/useWishitemSeq';
import * as process from 'process';

interface PaymentResponse {
  next_redirect_pc_url: string;
}


const Transfer = () => {
  const [selected, setSelected] = useState<'GROOM' | 'BRIDE'>();
  const [sender, setSender] = useState<string>('');
  const [amount, setAmount] = useState<number>();
  const [relationship, setRelationship] = useState<string>('');

  //zustand
  const {wishitemSeq} = useWishitemSeqStore();
  const {userCode} = userInfoStore();

  const handleChange = (value: 'GROOM' | 'BRIDE') => {
    setSelected(value);
  };

  const postMoneygift = async () => {
    try {
      const requestBody = {
        userCode: userCode,
        wishItemSequence: wishitemSeq,
        guestType: selected,
        type: wishitemSeq ? 'ITEM' : 'CASH',
        amount: amount,
        relationship: relationship,
        sender: sender,
      };

      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(requestBody),
      };

      const response = await fetchInstance('/moneygift/send', options);

      if (response.ok) {
        router.push('/complete');
      }

    } catch (error) {
      console.error('moneygift 송금 중 오류 발생', error);
    }
  };

  const kakaoPayMentAPI = async () => {
    const authorization = 'SECRET_KEY ' + process.env.NEXT_PUBLIC_KAKAOPAY_SECRET_KEY;
    const redirectUrl = process.env.NEXT_PUBLIC_KAKAOPAY_REDIRECT_URL;
    try {
      const paymentDataRequestBody = {
        cid: 'TC0ONETIME',
        partner_order_id: 'A403',
        partner_user_id: 'Marrymo',
        item_name: '축의금',
        quantity: 1,
        total_amount: amount,
        tax_free_amount: 0,
        approval_url: redirectUrl,
        cancel_url: redirectUrl,
        fail_url: redirectUrl,
      };
      const paymentResponse = await fetch('https://open-api.kakaopay.com/online/v1/payment/ready', {
        method: 'POST',
        headers: {
          'Authorization': authorization, // 관리자 키를 입력하세요.
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDataRequestBody),
      });
      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json() as PaymentResponse;
        window.location.href = paymentData.next_redirect_pc_url;
      }
    } catch (error) {
      console.error('paymentDataRequest 중 오류 발생', error);

    }

  };

  return (
    <>
      <Header title="축의금 보내기" hasPrevious />
      <main className={styles.transferWrapper}>
        <div>
          <div>
            <InputBox
              inputBoxHeader="이름"
              placeholder="이름을 입력해주세요."
              asterisk={true}
              value={sender}
              onValueChange={(val) => setSender(val)}

            />
          </div>
          <div>
            <InputBox
              inputBoxHeader="금액"
              placeholder="보내시는 금액을 입력해주세요"
              asterisk={true}
              value={amount ? amount.toString() : ''}
              onValueChange={(val) => setAmount(parseInt(val, 10) || 0)}
            />
          </div>
          <div>
            <InputBox
              inputBoxHeader="관계(선택)"
              placeholder="보내는 분과 어떤 관계인가요?"
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
          onClick={kakaoPayMentAPI}
          colorStyle={'roseGold'}
          filled={true}
          size="large"
          disabled={false}
        >
          보내기
        </Button>
      </main>
    </>
  );
};

export default Transfer;
