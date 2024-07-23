import { v4 as uuidv4 } from 'uuid'

import * as ADST from '../hooks/ApiDocStorage/types'

export const AUTHENTICATIONS_MOCK: ADST.AuthModelType[] = [
  { id: uuidv4(), title: 'Admin Auth', description: 'Admin auth token', type: 'Bearer Token' },
  { id: uuidv4(), title: 'Customer Auth', description: 'Customer auth token', type: 'Bearer Token' },
]

export const REQUESTS_MOCK: ADST.PayloadModelType[] = [
  { id: uuidv4(), title: '#1 My Request Model', contentType: 'Application/JSON' },
  { id: uuidv4(), title: '#2 My Request Model', contentType: 'Application/JSON' },
]

export const RESPONSES_MOCK: ADST.PayloadModelType[] = [
  { id: uuidv4(), title: '#1 My Response Model', contentType: 'Application/JSON' },
  { id: uuidv4(), title: '#2 My Response Model', contentType: 'Application/JSON' },
]

export const PATH_GROUPS_MOCK: ADST.ApiPathGroup[] = [
  {
    id: uuidv4(),
    groupName: 'Users',
    apiPaths: [
      {
        id: uuidv4(),
        pathMethod: 'GET',
        pathRoute: '/users',
        pathDescription: 'List all users',
        pathAuth: [],
        pathRouteParams: [],
        pathRouteQuery: [{
          param: 'example',
          type: 'boolean',
          description: 'Example of query param'
        }, {
          param: 'example',
          type: 'string',
          description: 'Example of query param'
        }],
        pathRequest: [REQUESTS_MOCK[0].id, REQUESTS_MOCK[1].id],
        pathResponse: [RESPONSES_MOCK[0].id, RESPONSES_MOCK[1].id],
      },
      {
        id: uuidv4(),
        pathMethod: 'POST',
        pathRoute: '/users',
        pathDescription: 'Create user',
        pathAuth: [],
        pathRouteParams: [],
        pathRouteQuery: [],
        pathRequest: [REQUESTS_MOCK[0].id, REQUESTS_MOCK[1].id],
        pathResponse: [RESPONSES_MOCK[0].id, RESPONSES_MOCK[1].id],
      },
      {
        id: uuidv4(),
        pathMethod: 'PUT',
        pathRoute: '/users/{id}',
        pathDescription: 'Update user',
        pathAuth: [AUTHENTICATIONS_MOCK[0].id],
        pathRouteParams: [
          { param: 'id', type: 'integer', description: 'User ID to be updated' }
        ],
        pathRouteQuery: [
          { param: 'example', type: 'boolean', description: 'Example of query param' },
          { param: 'example', type: 'boolean', description: 'Example of query param' },
        ],
        pathRequest: [REQUESTS_MOCK[0].id, REQUESTS_MOCK[1].id],
        pathResponse: [RESPONSES_MOCK[0].id, RESPONSES_MOCK[1].id],
      }
    ]
  },
  {
    id: uuidv4(),
    groupName: 'Posts',
    apiPaths: [
      {
        id: uuidv4(),
        pathMethod: 'GET',
        pathRoute: '/posts',
        pathDescription: 'List all posts',
        pathAuth: [],
        pathRouteParams: [],
        pathRouteQuery: [
          { param: 'example', type: 'boolean', description: 'Example of query param' },
        ],
        pathRequest: [REQUESTS_MOCK[0].id, REQUESTS_MOCK[1].id],
        pathResponse: [RESPONSES_MOCK[0].id, RESPONSES_MOCK[1].id],
      },
    ],
  }
]
