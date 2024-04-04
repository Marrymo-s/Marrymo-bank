
'use client'

import {useSearchParams} from 'next/navigation';
import {useAccountWhoStore} from '@/store/useAccountWho';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {fetchInstance} from '@/services';

const OpenBanking = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchCode  = searchParams.get('code')
  const {who, authStatus} = useAccountWhoStore()

  useEffect(() => {
    (async () => {
        if(who !== null && searchCode){
          console.log(who)
          try {
            const requestBody = {
              who: who,
              code: searchCode
            }

            const options: RequestInit = {
              method: 'POST',
              body: JSON.stringify(requestBody)
            }

            const response = await fetchInstance('/open-banking', options)

            if(response.ok) {
              router.push(`/account/register?who=${who}&success=true`)
            }

          }catch(error) {
            console.error('오픈뱅킹 연결 중', error)
          }
        }
      }
    )()
  }, [who, searchCode, router])

  return (
    <>
      <div>오픈뱅킹 연결</div>
    </>
  )
}

export default OpenBanking;