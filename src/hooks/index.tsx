import React, { PropsWithChildren } from 'react'

import { ApiDocStorageProvider } from './ApiDocStorage'

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApiDocStorageProvider>
      {children}
    </ApiDocStorageProvider>
  )
}
