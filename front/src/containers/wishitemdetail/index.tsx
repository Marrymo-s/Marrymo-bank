import React from 'react';

import { useRouter } from 'next/router';

import Header from "@/components/Header";

const WishItemDetail = () => {
  const router = useRouter();
  const { userCode, productId } = router.query; // URL에서 userCode와 productId 추출

  return (
    <>
      <Header title="위시리스트 상세" />
      <div>User Code: {userCode}</div>
      <div>Product ID: {productId}</div>
    </>
  )
}

export default WishItemDetail;