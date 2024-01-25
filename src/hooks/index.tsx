import React, { PropsWithChildren } from 'react'

import { ApiDocStorageProvider } from './ApiDocStorage'
import { ToastProvider } from './Toast'

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ToastProvider>
      <ApiDocStorageProvider>
        {children}
      </ApiDocStorageProvider>
    </ToastProvider>
  )
}
