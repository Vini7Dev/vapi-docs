import React, { useCallback, useEffect } from 'react'

import { XClose } from '../Icons'
import * as T from './types'
import './styles.css'

export const Modal: React.FC<T.ModalProps> = ({
  title,
  children,
  onClose,
}) => {
  useEffect(() => {
    document.body.classList.add('no-scroll')
  }, [])

  const beforeCloseModal = useCallback(() => {
    document.body.classList.remove('no-scroll')
    onClose()
  }, [onClose])

  return (
    <div className="modal_container">
      <div className="modal_background" onClick={beforeCloseModal} />

      <div className="modal_content_container">
        <div className="modal_content_wrapper">
          <div className="modal_content_header">
            <h3>{title}</h3>

            <XClose color="#FFFFFF" size={28} onClick={beforeCloseModal} />
          </div>

          <div className="modal_content_body">{children}</div>
        </div>
      </div>
    </div>
  )
}
