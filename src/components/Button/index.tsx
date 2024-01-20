import React from 'react'

import * as T from './types'
import './styles.css'

export const Button: React.FC<T.ButtonProps> = ({
  text,
  variant = 'secondary',
  className = '',
  height = 'big',
  isFullWidth = false,
  Icon,
  ...rest
}) => {
  return (
    <button
      className={`button button_${variant} button_height_${height} ${isFullWidth ? 'button_full_width' : ''} ${className}`}
      {...rest}
    >
      {Icon}

      {text}
    </button>
  )
}
