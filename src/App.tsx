import React from 'react'

import { TopBar } from './components/TopBar'
import { EditCoreSettings } from './pages/EditCoreSettings'
import { NavigationBar } from './components/NavigationBar'

export const App: React.FC = () => {
  return (
    <>
      <TopBar />

      <div id="page_content">
        <EditCoreSettings />
      </div>

      <NavigationBar />
    </>
  )
}
