import React from 'react'

import { TopBar } from './components/TopBar'
// import { EditCoreSettings } from './pages/EditCoreSettings'
import { EditApiPaths } from './pages/EditApiPaths'
import { NavigationBar } from './components/NavigationBar'

export const App: React.FC = () => {
  return (
    <>
      <TopBar />

      <main id="page_content">
        {/* <EditCoreSettings /> */}

        <EditApiPaths />
      </main>

      <NavigationBar />
    </>
  )
}
