import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface WishitemSeqState {
  wishitemSeq: number | null
  setWishitemSeq: (wishitemSeq: number | null) => void
}

export const useWishitemSeqStore = create<WishitemSeqState>()(
  devtools(
    persist(
      (set) => ({
        wishitemSeq: null,
        setWishitemSeq: (wishitemSeq) =>set({wishitemSeq}),
      }),
      {
        name: 'wishitem-sequence',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)