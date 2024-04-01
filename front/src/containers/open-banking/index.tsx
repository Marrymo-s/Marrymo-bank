'use client'

import {useSearchParams} from 'next/navigation';

const OpenBanking = () => {
  const searchParams = useSearchParams()
  const search  = searchParams.get('code')


  return (
    <>
    </>
  )
}

export default OpenBanking;