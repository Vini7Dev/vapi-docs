import React from 'react'

import * as T from './types'
import './styles.css'

export const TextArea: React.FC<T.TextAreaProps> = ({
  name,
  label,
  placeholder,
  ...rest
}) => {
  return (
    <div className="textarea_container">
      <label className="textarea_label" htmlFor={name}>{label}</label>

      <textarea
        className="textarea"
        id={name}
        placeholder={placeholder}
        rows={4}
        {...rest}
      />
    </div>
  )
}
