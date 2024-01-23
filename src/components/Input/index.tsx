import React, { useEffect } from 'react'

import * as T from './types'
import './styles.css'

export const Input: React.FC<T.InputProps> = ({
  name,
  label,
  placeholder,
  className = '',
  type = 'text',
  onLoad,
  ...rest
}) => {
  useEffect(() => {
    if (!onLoad) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onLoad({} as any)
  }, [])

  return (
    <div className={`input_container ${className} ${!label ? 'without_margin' : ''}`}>
      {label && <label className="input_label" htmlFor={name}>{label}</label>}

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
