
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface AccountWhoState {
  who: 'GROOM' | 'BRIDE' | 'BOTH' | null;
  setWho: (who: 'GROOM' | 'BRIDE' | 'BOTH' | null) => void;
}

export const usesAccountWhoStore = create<AccountWhoState>()(
  devtools(
    persist(
      (set) => ({
        who: null,
        setWho: (who) => set({ who }),
      }),
      {
        name: 'account-who', // persist key 얜 뭐지
        storage : createJSONStorage(() => localStorage),
      }
    )
  )
)
