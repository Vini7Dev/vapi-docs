import React from 'react'

import './styles.css'

export const NavigationBar: React.FC = () => {
  return (
    <div className="nav_container">
      <nav className="nav_wrapper">
        <a className="nav_item_selected" href="#">Core</a>

        <a className="nav_item" href="#">API Paths</a>

        <a className="nav_item" href="#">Models</a>
      </nav>
    </div>
  )
}
