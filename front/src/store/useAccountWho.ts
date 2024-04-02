
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface AccountWhoState {
  who: 'GROOM' | 'BRIDE' | 'BOTH' | null;
  authStatus: {GROOM ?: boolean, BRIDE ?: boolean};
  setWho: (who: 'GROOM' | 'BRIDE' | 'BOTH' | null) => void;
  setAuthStatus: (role: 'GROOM' | 'BRIDE', status: boolean) => void;
}

export const useAccountWhoStore = create<AccountWhoState>()(
  devtools(
    persist(
      (set) => ({
        who: null,
        authStatus: {},
        setWho: (who) => set({ who }),
        setAuthStatus: (role, status) => set((state) => ({
          authStatus: {...state.authStatus, [role]: status}
        })),
      }),
      {
        name: 'account-who',
        storage : createJSONStorage(() => sessionStorage),
      }
    )
  )
)
