import {create} from 'zustand';
import {devtools, persist, createJSONStorage} from 'zustand/middleware';

interface userInfo {
  userCode: string;
  setUserCode: (userCode: string) => void;
}

export const userInfoStore = create<userInfo>()(
  devtools(
    persist(
      (set) => ({
        userCode: '',
        setUserCode: (userCode: string) => set({userCode}),
      }),
      {
        name: 'user-info-storage',
        version: 1,
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
