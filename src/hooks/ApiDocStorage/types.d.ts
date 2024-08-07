type ApiDocStorageContextProps = {
  coreSettings: CoreSettingsType
  models: ModelsType
  apiPathGroups: ApiPathGroup[]
  saveOrUpdateCoreSettings(newCoreSettings: CoreSettingsType): SuccessResponseType
  saveOrUpdateAuthModel(
    modelGroup: 'authModels',
    payload: AuthModelType,
  ): SuccessResponseType
  saveOrUpdatePayloadModel(
    modelGroup: 'requestModels' | 'responseModels',
    payload: PayloadModelType,
  ): SuccessResponseType
  removeModelFromList(modelGroup: keyof ModelsType, modelId: string): void
  saveOrUpdatePathGroup(payload: Omit<ApiPathGroup, 'apiPaths'>): SuccessResponseType
  removePathGroupFromList(id: string): void
  saveOrUpdatePath(
    groupId: string,
    payload: ApiPathData,
  ): SuccessResponseType
  removePathFromList(groupIndex: number, indexToRemove: number): void
}

type SuccessResponseType = { success: boolean }

export type ApiDocType = {
  coreSettings: CoreSettingsType
  models: ModelsType
  apiPathGroups: ApiPathGroup[]
}

export type CoreSettingsType = {
  projectName: string
  version: string
  baseURL: string
  description: string
}

export type ModelsType = {
  authModels: AuthModelType[]
  requestModels: PayloadModelType[]
  responseModels: PayloadModelType[]
}

export type type = 'Bearer Token'

export type AuthModelType = {
  id: string
  title: string
  description?: string
  type: type
}

export type ContentType = 'Application/JSON'

export type PayloadModelType = {
  id: string
  title: string
  contentType: ContentType
}

export type ApiPathGroup = {
  id?: string
  groupName: string
  apiPaths: ApiPathData[]
}

export type ApiPathData = {
  id: string
  pathMethod: HttpMethods
  pathRoute: string
  pathDescription: string
  pathRouteParams: RouteParamType[]
  pathRouteQuery: QueryParamType[]
  pathAuth: AuthenticationIdType[]
  pathRequest: RequestIdType[]
  pathResponse: ResponseIdType[]
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RouteParamType = {
  param: string
  type: string
  description: string
}

export type QueryParamType = {
  param: string
  type: string
  description: string
}

export type AuthenticationIdType = string

export type RequestIdType = string

export type ResponseIdType = string

export type PathArrayItemType = { [key: string]: string }
