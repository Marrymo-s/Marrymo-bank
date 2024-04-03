import React, {createContext, useContext, useState, ReactNode} from 'react';

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('ErrorMessage: useModal 함수는 ModalProvider 안에서 사용되어야 합니다.');
  }
  return context;
}

export const ModalProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
      {children}
    </ModalContext.Provider>
  );
};