import React from 'react'

import * as T from './types'
import './styles.css'

export const Button: React.FC<T.ButtonProps> = ({
  text,
  variant = 'secondary',
  className = '',
  Icon,
  ...rest
}) => {
  return (
    <button className={`button button_${variant} ${className}`} {...rest}>
      {Icon}

      {text}
    </button>
  )
}
