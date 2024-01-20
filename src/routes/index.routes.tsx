import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { EditApiPathList } from '../pages/EditApiPathList'
import { EditCoreSettings } from '../pages/EditCoreSettings'
import { EditModelList } from '../pages/EditModelList'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<EditApiPathList />} />
      <Route path="/core-settings" element={<EditCoreSettings />} />
      <Route path="/models" element={<EditModelList />} />
    </Routes>
  )
}
