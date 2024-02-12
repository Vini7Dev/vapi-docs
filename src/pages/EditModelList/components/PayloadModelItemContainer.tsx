import React, { useCallback, useState } from 'react'

import { useApiDocStorage } from '../../../hooks/ApiDocStorage'
import { ArrowDown, ArrowRight, Edit, Trash } from '../../../components/Icons'
import * as T from '../types'

export const PayloadModelItemContainer: React.FC<T.PayloadModelItemContainerProps> = ({
  modelGroup,
  id,
  title,
  contentType,
  onClickInEdit,
}) => {
  const { removeModelFromList } = useApiDocStorage()

  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className="model_item_section model_item_payload_section">
      <div className="model_item_header" onClick={toggleIsOpen}>
        <strong className="model_item_header_title">{title}</strong>

        {
          isOpen
            ? <ArrowDown className="model_item_section_arrow post_method_color" size={18} />
            : <ArrowRight className="model_item_section_arrow post_method_color" size={18} />
        }
      </div>

      {
        isOpen && (
          <div className="model_item_content_body">
            <div className="model_item_edit_delete_buttons">
              <button
                className="model_item_specification_edit"
                onClick={() => onClickInEdit(modelGroup, { id, title, contentType })}
              >
                <Edit size={16} /> Edit
              </button>

              <button
                className="model_item_specification_delete"
                onClick={() => removeModelFromList(modelGroup, id)}
              >
                <Trash size={16} /> Delete
              </button>
            </div>

            <span>{contentType}</span>

          </div>
        )
      }
    </div>
  )
}
