
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface userInfo {
  userCode: string;
  setUserCode: (code: string) => void;
}

export const userInfoStore = create<userInfo>()(
  devtools(
    persist(
      (set) => ({
        userCode: '',
        setUserCode: (code: string) => set({ userCode: code }),
      }),
      {
        name: 'user-info-storage', // persist key 얜 뭐지
      }
    )
  )
)
