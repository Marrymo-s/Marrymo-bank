
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface updateInfo {
  latestUpdateTime: number;
  setLatestUpdateTime: (latestUpdateTime: number) => void;
}

export const wishItemStore = create<updateInfo>()(
  devtools(
    persist(
      (set) => ({
        latestUpdateTime: Date.now(),
        setLatestUpdateTime: () => set({ latestUpdateTime: Date.now() }),
      }),
      {
        name: 'update-time', // persist key 얜 뭐지
        version: 1,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
)
