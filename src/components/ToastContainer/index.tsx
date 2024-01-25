import React from 'react'

import { useToast } from '../../hooks/Toast'
import { XClose } from '../Icons'
import * as T from './types'
import './styles.css'

export const ToastContainer: React.FC<T.ToastContainerProps> = ({ messages }) => {
  const { removeToast } = useToast()

  return (
    <div className="toast_container">
      {messages.map((message, idx) => (
        <span
          key={idx}
          className={`toast_item toast_${message.type}`}
          onClick={() => removeToast(message.id)}
        >
          {message.message}

          <XClose size={20} />
        </span>
      ))}
    </div>
  )
}
