'use client';
// url이 동적으로 변하면 CSR로 해야함
import { useParams } from 'next/navigation';


const Detail = () => {
  const { user, product } = useParams()

  return (
    <>
      <div>제품:{product}</div>
      <div>유저:{user}</div>
    </>
  )
}

export default Detail;