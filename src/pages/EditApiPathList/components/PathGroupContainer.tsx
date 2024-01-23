import React from 'react'

import { Edit, Plus, Trash } from '../../../components/Icons'
import { PathItemContrainer } from './PathItemContrainer'
import * as T from '../types'

export const PathGroupContainer: React.FC<T.PathGroupContainerProps> = ({
  pathGroupName,
  pathItems,
  togglePathDataModal,
}) => {
  return (
    <div className="path_group_container">
      <div className="path_group_header">
        <h3 className="path_group_name">{pathGroupName}</h3>

        <button className="path_group_add" onClick={togglePathDataModal}>
          <Plus size={20} /> Add Path
        </button>

        <button className="path_group_edit" onClick={togglePathDataModal}>
          <Edit size={20} /> Edit
        </button>

        <button className="path_group_delete">
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
