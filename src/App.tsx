import React from 'react'

import { AppProviders } from './hooks'
import { AppRoutes } from './routes/index.routes'
import { TopBar } from './components/TopBar'
import { NavigationBar } from './components/NavigationBar'

export const App: React.FC = () => {
  return (
    <AppProviders>
      <TopBar />
      <NavigationBar />

      <main id="page_content">
        <AppRoutes />
      </main>
    </AppProviders>
  )
}
