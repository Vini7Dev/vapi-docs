import React from 'react'

import { useApiDocStorage } from '../../../hooks/ApiDocStorage'
import { Edit, Plus, Trash } from '../../../components/Icons'
import { PathItemContrainer } from './PathItemContrainer'
import * as T from '../types'

export const PathGroupContainer: React.FC<T.PathGroupContainerProps> = ({
  index,
  pathGroupName,
  pathItems,
  onAddOrEditPathGroup,
  onAddOrEditPath,
}) => {
  const { removePathGroupFromList } = useApiDocStorage()

  return (
    <div className="path_group_container">
      <div className="path_group_header">
        <h3 className="path_group_name">{pathGroupName}</h3>

        <button className="path_group_add" onClick={onAddOrEditPath}>
          <Plus size={20} /> Add Path
        </button>

        <button className="path_group_edit" onClick={() => onAddOrEditPathGroup(index)}>
          <Edit size={20} /> Edit
        </button>

        <button className="path_group_delete" onClick={() => removePathGroupFromList(index)}>
          <Trash size={20} /> Delete
        </button>
      </div>

      {
        pathItems.map((pathItem, idx) => (
          <PathItemContrainer
            key={idx}
            method={pathItem.method}
            pathRoute={pathItem.pathRoute}
            pathDescription={pathItem.pathDescription}
            authenticationsSection={pathItem.authenticationsSection}
            routeParamsSection={pathItem.routeParamsSection}
            queryParamsSection={pathItem.queryParamsSection}
            requestBodiesSection={pathItem.requestBodiesSection}
            responseBodiesSection={pathItem.responseBodiesSection}
          />
        ))
      }
    </div>
  )
}
