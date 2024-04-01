import {create} from 'zustand';
import {devtools, persist, createJSONStorage} from 'zustand/middleware';

interface userSender {
  sender: string;
  setSender: (sender: string) => void;
}

export const userSenderStore = create<userSender>()(
  devtools(
    persist(
      (set) => ({
        sender: '',
        setSender: (sender: string) => set({sender}),
      }),
      {
        name: 'user-sender-storage',
        version: 1,
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export const getSender = () => userSenderStore((state) => state.sender);

export const setSender = () => userSenderStore((state) => state.setSender);
