import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import './styles.css'

const NAVIGATION_LINKS = [
  { path: '/core-settings', pageName: 'Core' },
  { path: '/', pageName: 'API Paths' },
  { path: '/models', pageName: 'Models' },
]

export const NavigationBar: React.FC = () => {
  const location = useLocation()

  return (
    <div className="nav_container">
      <nav className="nav_wrapper">
        {
          NAVIGATION_LINKS.map((link, idx) => (
            <Link key={idx} to={link.path}>
              <span className={
                location.pathname === link.path ? 'nav_item_selected' : 'nav_item'
              }>{link.pageName}</span>
            </Link>
          ))
        }
      </nav>
    </div>
  )
}
