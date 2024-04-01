'use client'

import {useSearchParams} from 'next/navigation';
import {useAccountWhoStore} from '@/store/useAccountWho';
import {useEffect} from 'react';
import {router} from 'next/client';

const OpenBanking = () => {
  const searchParams = useSearchParams()
  const searchCode  = searchParams.get('code')
  const {who, authStatus} = useAccountWhoStore()

  useEffect(() => {
    const registAccount = async () => {
      try {
        const requestBody = {
          who: who,
          code: searchCode
        }

        const options: RequestInit = {
          method: 'POST',
          body: JSON.stringify(requestBody)
        }

        const response = await fetch('/open-banking', options)

        if(response.ok) {
          // router.push(`/account/register?who=${who}&success=true&role=${redirectRole}`)
          router.push(`/account/register?who=${who}&success=true`)
        }

      }catch(error) {
        console.error('오픈뱅킹 연결 중', error)
      }
    }

    if (who && searchCode) {
      registAccount();
    }
  }, [who, searchCode])

  return (
    <>
    </>
  )
}

export default OpenBanking;