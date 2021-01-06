import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Toast from '../components/ToastContainer';
import ToastMessageInterface from '../interfaces/ToastMessages';

interface ToastContextShape {
  addToast(message: Omit<ToastMessageInterface, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextShape>({} as ToastContextShape);

export function useToast(): ToastContextShape {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be within a ToastProvider');
  }

  return context;
}

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessageInterface[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessageInterface, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        title,
        type,
        description,
      };

      setMessages(oldMessages => [...oldMessages, toast]);
    },
    [],
  );

  const removeToast = useCallback(
    (id: string) => {
      const newMessages = messages.filter(message => message.id !== id);

      setMessages(newMessages);
    },
    [messages],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toast messages={messages} />
    </ToastContext.Provider>
  );
};
