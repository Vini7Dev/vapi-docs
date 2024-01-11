import React, { useCallback, useState } from 'react'

import { ArrowDown, ArrowRight, Edit, Trash } from '../../components/Icons'
import * as T from './types'

const PathItemSection: React.FC<T.PathItemSectionProps> = ({
  method,
  title,
  specifications,
}) => {
  return (
    <div className="path_item_section">
      <h4 className="path_item_section_title">{title}</h4>

      <div className="path_item_specification_container">
        {specifications.map(({ name, type, description }, idx) => (
          <div key={idx} className="path_item_specification">
            <strong className={`${method}_method_color`}>{name} {type && `(${type})`}</strong>

            <span>{description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PathItemPayloadSection: React.FC<T.PathItemPayloadSectionProps> = ({
  method,
  title,
  payloads,
}) => {
  const [openedPayloads, setOpenedPayloads] = useState<number[]>([])

  const updateOpenedPayloads = useCallback((idx: number) => {
    const updatedOpenedPayloads = [...openedPayloads]

    const payloadToUpdateIndex = updatedOpenedPayloads.findIndex((index) => index === idx)

    if (payloadToUpdateIndex === -1) updatedOpenedPayloads.push(idx)
    else updatedOpenedPayloads.splice(payloadToUpdateIndex, 1)

    setOpenedPayloads(updatedOpenedPayloads)
  }, [openedPayloads])

  return (
    <div className="path_item_section">
      <h4 className="path_item_section_title">{title}</h4>

      <div className="path_item_specification_container">
        {payloads.map(({ name, type }, idx) => {
          const isOpened = openedPayloads.includes(idx)

          return (
            <div key={idx}>
              <button
                className="path_item_specification"
                onClick={() => updateOpenedPayloads(idx)}
              >
                <strong className={`${method}_method_color`}>{name}</strong>

                {
                  isOpened
                    ? <ArrowDown className={`path_specification_arrow ${method}_method_color`} size={18} />
                    : <ArrowRight className={`path_specification_arrow ${method}_method_color`} size={18} />
                }
              </button>

              {isOpened && (
                <div className="path_item_specification_accordion_content">
                  <span>{type}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const PathItemContrainer: React.FC<T.PathItemContrainerProps> = ({
  method,
  pathRoute,
  pathDescription,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className={`path_item_container ${method}_method_border`}>
      <div className={'path_item_header'} onClick={toggleIsOpen}>
        <strong className={`path_method ${method}_method_color`}>{method}</strong>

        <span className={'path_route'}>{pathRoute}</span>

        <p className={'path_description'}>{pathDescription}</p>

        {
          isOpen
            ? <ArrowDown className={`path_specification_arrow ${method}_method_color`} size={18} />
            : <ArrowRight className={`${method}_method_color`} size={18} />
        }
      </div>

      {
        isOpen && (
          <div className="path_content_body">
            <div className="path_edit_delete_options">
              <button className="path_item_edit">
                <Edit size={20} /> Edit
              </button>

              <button className="path_item_delete">
                <Trash size={20} /> Delete
              </button>
            </div>

            <PathItemSection
              method={method}
              title={'Authentication'}
              specifications={[
                { name: 'Customer Authentication', description: '(Bearer Token)' },
              ]}
            />

            <PathItemSection
              method={method}
              title={'Route Params'}
              specifications={[
                { name: 'id', type: 'integer', description: 'User ID to be updated' },
              ]}
            />

            <PathItemSection
              method={method}
              title={'Query Params'}
              specifications={[
                { name: 'example', type: 'boolean', description: 'Example of query param' },
                { name: 'example', type: 'boolean', description: 'Example of query param' },
              ]}
            />

            <PathItemPayloadSection
              method={method}
              title={'Request Body'}
              payloads={[
                { name: 'My Request Model #1', type: 'Application/JSON' },
                { name: 'My Request Model #2', type: 'Application/JSON' },
              ]}
            />

            <PathItemPayloadSection
              method={method}
              title={'Responses'}
              payloads={[
                { name: '400 My Response Model #1', type: 'Application/JSON' },
                { name: '401 My Response Model #2', type: 'Application/JSON' },
              ]}
            />
          </div>
        )
      }
    </div>
  )
}
