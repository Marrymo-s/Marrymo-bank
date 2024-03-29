'use client';

import Checkbox from '@/components/Checkbox';
import useModal from '@/hooks/useModal'
import Button from "@/components/Button";
import {useRouter} from 'next/navigation';

const Pangpang = () => {
  const {Modal, openModal} = useModal();
  const router = useRouter();
  return (
    <div>
      <Checkbox checked={false} onChange={() => {
      }}>위 약관에 동의~</Checkbox>
      <Button
        type='submit'
        onClick={openModal}
      >모달 열기</Button>
      <Modal title='모달 테스트'>
        <div>
          <Button
            type='button'
            size='large'
            filled
            onClick={() => router.push('/home')}
          >
            모달 창 떴다!
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Pangpang;