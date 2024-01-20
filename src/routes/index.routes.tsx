import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { EditApiPaths } from '../pages/EditApiPaths'
import { EditCoreSettings } from '../pages/EditCoreSettings'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<EditApiPaths />} />
      <Route path="/core-settings" element={<EditCoreSettings />} />
      <Route path="/models" element={<EditApiPaths />} />
    </Routes>
  )
}
