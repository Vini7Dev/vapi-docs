import React from 'react'

import * as T from './types'
import './styles.css'

export const PageTitle: React.FC<T.PageTitleProps> = ({ title }) => {
  return <h1 className="page_title">{title}</h1>
}
