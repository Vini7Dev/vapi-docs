import React from 'react'

import { TopBar } from './components/TopBar'
import { NavigationBar } from './components/NavigationBar'
import { AppRoutes } from './routes/index.routes'

export const App: React.FC = () => {
  return (
    <>
      <TopBar />
      <NavigationBar />

      <main id="page_content">
        <AppRoutes />
      </main>
    </>
  )
}
