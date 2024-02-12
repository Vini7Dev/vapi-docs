import React, { useCallback, useState } from 'react'

import { ArrowDown, ArrowRight, Edit, Trash } from '../../../components/Icons'
import * as T from '../types'
import { getModelById } from '../../../utils/getModelById'

const PathItemSection: React.FC<T.PathItemSectionProps> = ({
  method,
  title,
  specifications,
}) => {
  if (specifications.length === 0) return <></>

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
  if (payloads.length === 0) return <></>

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
  pathData: {
    pathMethod,
    pathRoute,
    pathDescription,
    pathRouteParams,
    pathRouteQuery,
    pathAuth,
    pathRequest,
    pathResponse,
  },
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const pathMethodLowerCase = pathMethod.toLowerCase()

  const pathAuthModels = pathAuth.map(modelId => {
    return getModelById('authModels', modelId)
  })

  const pathRequestModels = pathRequest.map(modelId => {
    const model = getModelById('requestModels', modelId)
    return { name: model.title, type: model.contentType }
  })

  const pathResponseModels = pathResponse.map(modelId => {
    const model = getModelById('responseModels', modelId)
    return { name: model.title, type: model.contentType }
  })

  return (
    <div className={`path_item_container ${pathMethodLowerCase}_method_border`}>
      <div className={'path_item_header'} onClick={toggleIsOpen}>
        <strong className={`path_method ${pathMethodLowerCase}_method_color`}>{pathMethodLowerCase}</strong>

        <span className={'path_route'}>{pathRoute}</span>

        <p className={'path_description'}>{pathDescription}</p>

        {
          isOpen
            ? <ArrowDown className={`path_specification_arrow ${pathMethodLowerCase}_method_color`} size={18} />
            : <ArrowRight className={`${pathMethodLowerCase}_method_color`} size={18} />
        }
      </div>

      {
        isOpen && (
          <div className="path_content_body">
            <div className="path_edit_delete_options">
              <button className="path_item_edit">
                <Edit size={20} />
              </button>

              <button className="path_item_delete">
                <Trash size={20} />
              </button>
            </div>

            <PathItemSection
              title="Authentication"
              method={pathMethod}
              specifications={pathAuthModels}
            />

            <PathItemSection
              title="Route Params"
              method={pathMethod}
              specifications={pathRouteParams.map(item => ({
                type: item.type,
                name: item.param,
                description: item.description,
              }))}
            />

            <PathItemSection
              title="Query Params"
              method={pathMethod}
              specifications={pathRouteQuery.map(item => ({
                type: item.type,
                name: item.param,
                description: item.description,
              }))}
            />

            <PathItemPayloadSection
              title="Request Body"
              method={pathMethod}
              payloads={pathRequestModels}
            />

            <PathItemPayloadSection
              title="Responses"
              method={pathMethod}
              payloads={pathResponseModels}
            />
          </div>
        )
      }
    </div>
  )
}
