import React from 'react';
import {create, useStore} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const StorageKey = 'sender';

interface Sender {
  sender: string,
  setSender: (sender: string) => void;
}

export const SenderStore = create(
  persist<Sender>(
    (set) => ({
      sender: '',

      setSender: (sender: string) => {
        set({sender});
      },
    }),
    {
      name: StorageKey,
    },
  ),
);

export const getSender = () =>
  SenderStore((state) => state.sender);

export const setSender = () =>
  SenderStore(state => state.setSender);
