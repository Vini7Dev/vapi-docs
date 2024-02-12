import * as ADST from '../hooks/ApiDocStorage/types'

export const AUTHENTICATIONS_MOCK: ADST.AuthModelType[] = [
  { title: 'Admin Auth', type: 'Bearer Token' },
  { title: 'Customer Auth', type: 'Bearer Token' },
]

export const REQUESTS_MOCK: ADST.PayloadModelType[] = [
  { title: '#1 My Request Model', contentType: 'Application/JSON' },
  { title: '#2 My Request Model', contentType: 'Application/JSON' },
]

export const RESPONSES_MOCK: ADST.PayloadModelType[] = [
  { title: '#1 My Response Model', contentType: 'Application/JSON' },
  { title: '#2 My Response Model', contentType: 'Application/JSON' },
]

export const PATH_GROUPS_MOCK: ADST.ApiPathGroup[] = [
  {
    groupName: 'Users',
    apiPaths: [
      {
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
        pathRequest: ['0', '1'],
        pathResponse: ['2', '3'],
      },
      {
        pathMethod: 'POST',
        pathRoute: '/users',
        pathDescription: 'Create user',
        pathAuth: [],
        pathRouteParams: [],
        pathRouteQuery: [],
        pathRequest: ['0', '1'],
        pathResponse: ['2', '3'],
      },
      {
        pathMethod: 'PUT',
        pathRoute: '/users/{id}',
        pathDescription: 'Update user',
        pathAuth: ['4'],
        pathRouteParams: [
          { param: 'id', type: 'integer', description: 'User ID to be updated' }
        ],
        pathRouteQuery: [
          { param: 'example', type: 'boolean', description: 'Example of query param' },
          { param: 'example', type: 'boolean', description: 'Example of query param' },
        ],
        pathRequest: ['0', '1'],
        pathResponse: ['2', '3'],
      }
    ]
  },
  {
    groupName: 'Posts',
    apiPaths: [
      {
        pathMethod: 'GET',
        pathRoute: '/posts',
        pathDescription: 'List all posts',
        pathAuth: [],
        pathRouteParams: [],
        pathRouteQuery: [
          { param: 'example', type: 'boolean', description: 'Example of query param' },
        ],
        pathRequest: ['0', '1'],
        pathResponse: ['2', '3'],
      },
    ],
  }
]
