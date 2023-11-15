import React from 'react'

import * as T from './types'
import './styles.css'

export const Input: React.FC<T.InputProps> = ({
  name,
  label,
  placeholder,
  className = '',
  type = 'text',
  ...rest
}) => {
  return (
    <div className={`input_container ${className}`}>
      <label className="input_label" htmlFor={name}>{label}</label>

      <input
        className="input"
        id={name}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}
