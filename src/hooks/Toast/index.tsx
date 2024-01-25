import React, { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react'

import { ToastContainer } from '../../components/ToastContainer'
import * as T from './types'

const ToastContext = createContext<T.ToastContextProps>({} as T.ToastContextProps)

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [messages, setMessages] = useState<T.MessageProps[]>([])

  const addToast = useCallback(({ message, type }: Omit<T.MessageProps, 'id'>) => {
    const id = Math.random()

    const toast = {
      id,
      type,
      message,
    }

    setMessages(oldMessages => [...oldMessages, toast])
  }, [])

  const removeToast = useCallback((id: number) => {
    setMessages(oldMessages => oldMessages.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{
      addToast,
      removeToast,
    }}>
      {children}

      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  return context
}
