'use client';

import React from 'react';
import {ModalProvider} from '@/contexts/ModalContext'; // 경로에 맞게 조정하세요.

interface Props {
  children: React.ReactNode;
}

const Provider = ({children}: Props) => {
  return <ModalProvider>{children}</ModalProvider>;
};

export default Provider;