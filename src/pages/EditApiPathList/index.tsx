import React from 'react'

import { Plus } from '../../components/Icons'
import { Button } from '../../components/Button'
import { PageTitle } from '../../components/PageTitle'
import { PathGroupContainer } from './components/PathGroupContainer'
import * as T from './types'
import './styles.css'

const PATH_GROUPS_MOCK: T.PathGroupContainerProps[] = [
  {
    pathGroupName: 'Users',
    pathItems: [
      {
        method: 'get',
        pathRoute: '/users',
        pathDescription: 'List all users',
        authenticationsSection: [],
        routeParamsSection: [],
        queryParamsSection: [
          { name: 'example', type: 'boolean', description: 'Example of query param' },
          { name: 'example', type: 'boolean', description: 'Example of query param' },
        ],
        requestBodiesSection: [
          { name: 'My Request Model #1', type: 'Application/JSON' },
          { name: 'My Request Model #2', type: 'Application/JSON' },
        ],
        responseBodiesSection: [
          { name: '400 My Response Model #1', type: 'Application/JSON' },
          { name: '401 My Response Model #2', type: 'Application/JSON' },
        ],
      },
      {
        method: 'post',
        pathRoute: '/users',
        pathDescription: 'Create user',
        authenticationsSection: [],
        routeParamsSection: [],
        queryParamsSection: [],
        requestBodiesSection: [
          { name: 'My Request Model #1', type: 'Application/JSON' },
          { name: 'My Request Model #2', type: 'Application/JSON' },
        ],
        responseBodiesSection: [
          { name: '400 My Response Model #1', type: 'Application/JSON' },
          { name: '401 My Response Model #2', type: 'Application/JSON' },
        ],
      },
      {
        method: 'put',
        pathRoute: '/users/{id}',
        pathDescription: 'Update user',
        authenticationsSection: [
          { name: 'Customer Authentication', description: '(Bearer Token)' },
        ],
        routeParamsSection: [
          { name: 'id', type: 'integer', description: 'User ID to be updated' }
        ],
        queryParamsSection: [
          { name: 'example', type: 'boolean', description: 'Example of query param' },
          { name: 'example', type: 'boolean', description: 'Example of query param' },
        ],
        requestBodiesSection: [
          { name: 'My Request Model #1', type: 'Application/JSON' },
          { name: 'My Request Model #2', type: 'Application/JSON' },
        ],
        responseBodiesSection: [
          { name: '400 My Response Model #1', type: 'Application/JSON' },
          { name: '401 My Response Model #2', type: 'Application/JSON' },
        ],
      }
    ]
  },
  {
    pathGroupName: 'Posts',
    pathItems: [
      {
        method: 'get',
        pathRoute: '/posts',
        pathDescription: 'List all posts',
        authenticationsSection: [],
        routeParamsSection: [],
        queryParamsSection: [
          { name: 'example', type: 'boolean', description: 'Example of query param' },
        ],
        requestBodiesSection: [
          { name: 'My Request Model #1', type: 'Application/JSON' },
        ],
        responseBodiesSection: [
          { name: '400 My Response Model #1', type: 'Application/JSON' },
        ],
      },
    ],
  }
]

export const EditApiPathList: React.FC = () => {
  return (
    <div className="api_paths_container">
      <div className="page_content_max_width">
        <PageTitle title="API Paths" />

        <Button
          text="Create Path Group"
          type="button"
          className="create_group_button"
          Icon={<Plus size={24} />}
        />

        {PATH_GROUPS_MOCK.map((pathGroup, idx) => (
          <PathGroupContainer
            key={idx}
            pathGroupName={pathGroup.pathGroupName}
            pathItems={pathGroup.pathItems}
          />
        ))}
      </div>
    </div>
  )
}
