import React from 'react'
import ReactDOM from 'react-dom/client'

import './global/styles/index.css'
import { EditDocumentation } from './pages/EditDocumentation'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <EditDocumentation />
  </React.StrictMode>
)
