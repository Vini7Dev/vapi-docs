type ApiDocStorageContextProps = {
  coreSettings: CoreSettingsType
  models: ModelsType
  apiPathGroups: ApiPathGroup[]
  saveOrUpdateCoreSettings(newCoreSettings: CoreSettingsType): SuccessResponseType
  saveOrUpdateAuthModel(
    modelGroup: 'authModels',
    payload: AuthModelType,
    indexToUpdate?: number,
  ): SuccessResponseType
  saveOrUpdatePayloadModel(
    modelGroup: 'requestModels' | 'responseModels',
    payload: PayloadModelType,
    indexToUpdate?: number,
  ): SuccessResponseType
  removeModelFromList(modelGroup: keyof ModelsType, indexToRemove: number): void
  saveOrUpdatePathGroup(payload: Omit<ApiPathGroup, 'apiPaths'>, indexToUptade?: number): SuccessResponseType
  removePathGroupFromList(indexToRemove: number): void
  saveOrUpdatePath(
    groupIndex: number,
    payload: PathFromData,
    indexToUpdate?: number
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
  title: string
  type: type
}

export type ContentType = 'Application/JSON'

export type PayloadModelType = {
  title: string
  contentType: ContentType
}

export type ApiPathGroup = {
  groupName: string
  apiPaths: PathFromData[]
}

export type PathFromData = {
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
