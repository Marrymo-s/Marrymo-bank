import type {Metadata} from 'next'

import Script from 'next/script';

import {Inter} from 'next/font/google'

import Provider from '@/app/Provider';
import localFont from 'next/font/local';
// const Pretendard = localFont({
//   src: './fonts/PretendardVariable.woff2',
// });

import './layout.css';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Marrymo(메리모)',
  description: '모바일 청첩장과 축의금 송금은 Marrymo!',
}

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    kakao: any;
  }
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <div id='modal'/>
        </Provider>
      </body>
      <Script src="https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.js"
              async/>
      <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAPAPI_KEY}&autoload=false&libraries=services`}
      />
      </html>
  )
}