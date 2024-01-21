import React from 'react'

import * as T from './types'
import './styles.css'

export const Select: React.FC<T.SelectProps> = ({
  name,
  label,
  placeholder,
  className = '',
  options,
  backgroundColor,
  ...rest
}) => {
  return (
    <div className={`select_container ${className}`}>
      <label className="select_label" htmlFor={name}>{label}</label>

      <select
        className="select"
        id={name}
        placeholder={placeholder}
        style={backgroundColor ? { backgroundColor } : {}}
        {...rest}
      >
        {
          options.map((option, idx) => (
            <option key={idx} value={option}>{option}</option>
          ))
        }
      </select>
    </div>
  )
}
