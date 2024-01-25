import React from 'react'

import { useApiDocStorage } from '../../../hooks/ApiDocStorage'
import { Edit, Trash } from '../../../components/Icons'
import * as T from '../types'

export const AuthModelItemContainer: React.FC<T.AuthModelItemContainerProps> = ({
  index,
  authTitle,
  authType,
  onClickInEdit,
}) => {
  const { removeModelFromList } = useApiDocStorage()

  return (
    <div className="model_item_section model_item_auth_section">
      <strong className="model_item_header_title">{authTitle}</strong>

      <span>{authType}</span>

      <div className="model_item_edit_delete_buttons">
        <button
          className="model_item_specification_edit"
          onClick={() => onClickInEdit(index, 'authModels', { authTitle, authType })}
        >
          <Edit size={16} /> Edit
        </button>

        <button
          className="model_item_specification_delete"
          onClick={() => removeModelFromList('authModels', index)}
        >
          <Trash size={16} /> Delete
        </button>
      </div>
    </div>
  )
}
