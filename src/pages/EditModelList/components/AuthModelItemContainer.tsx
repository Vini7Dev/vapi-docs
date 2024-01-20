import React from 'react'

import { Edit, Trash } from '../../../components/Icons'
import * as T from '../types'

export const AuthModelItemContainer: React.FC<T.AuthModelItemContainerProps> = ({
  authTitle,
  authType,
}) => {
  return (
    <div className="model_item_section model_item_auth_section">
      <strong className="model_item_header_title">{authTitle}</strong>

      <span>{authType}</span>

      <div className="model_item_edit_delete_buttons">
        <button className="model_item_specification_edit">
          <Edit size={16} /> Edit
        </button>

        <button className="model_item_specification_delete">
          <Trash size={16} /> Delete
        </button>
      </div>
    </div>
  )
}
