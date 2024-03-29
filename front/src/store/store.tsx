
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface userInfo {
  userCode: string;
  setUserCode: (userCode: string) => void;
}

export const userInfoStore = create<userInfo>()(
  devtools(
    persist(
      (set) => ({
        userCode: 'kcre5939',
        setUserCode: (userCode: string) => set({ userCode }),
      }),
      {
        name: 'user-info-storage', // persist key 얜 뭐지
        version: 1,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
)
