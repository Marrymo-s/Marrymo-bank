import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'

interface userInfo {
  userCode: string;
  setUserCode: (userCode: string) => void;
}

export const userInfoStore = create<userInfo>()(
  devtools(
    persist(
      (set) => ({
        // TODO: userCode 테스트용 -> 최종 시연 전에는 빼자
        userCode: 'kcre5939',
        setUserCode: (userCode: string) => set({userCode}),
      }),
      {
        name: 'user-info-storage', // persist key 얜 뭐지
        version: 1,
      }
    )
  )
)