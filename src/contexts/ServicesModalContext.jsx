// src/contexts/ModalContext.jsx
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({}); // dynamic modals state

  const openModal = (key, data = null) => {
    setModals((prev) => ({ ...prev, [key]: { isOpen: true, data } }));
  };

  const closeModal = (key) => {
    setModals((prev) => ({ ...prev, [key]: { ...prev[key], isOpen: false } }));
  };

  const getModalData = (key) => modals[key]?.data || null;
  const isModalOpen = (key) => !!modals[key]?.isOpen;

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, getModalData, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
