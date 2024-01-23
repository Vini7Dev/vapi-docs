import React, { useEffect } from 'react'

import * as T from './types'
import './styles.css'

export const Select: React.FC<T.SelectProps> = ({
  name,
  label,
  placeholder,
  className = '',
  options,
  backgroundColor,
  onLoad,
  ...rest
}) => {
  useEffect(() => {
    if (!onLoad) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onLoad({} as any)
  }, [])

  return (
    <div className={`select_container ${className} ${!label ? 'without_margin' : ''}`}>
      {label && (
        <label className="select_label" htmlFor={name}>{label}</label>
      )}

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
