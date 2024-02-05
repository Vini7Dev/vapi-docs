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

export type AuthType = 'Bearer Token'

export type AuthModelType = {
  authTitle?: string
  authType?: AuthType
}

export type ContentType = 'Application/JSON'

export type PayloadModelType = {
  payloadTitle?: string
  contentType?: ContentType
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
  pathAuth: AuthenticationType[]
  pathRequest: RequestType[]
  pathResponse: ResponseType[]
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type PathArrayItemType = { [key: string]: string }

export interface RouteParamType extends PathArrayItemType {
  routeParam: string;
  routeParamDescription: string
}

export interface QueryParamType extends PathArrayItemType {
  routeQuery: string;
  routeQueryDescription: string
}

export interface AuthenticationType extends PathArrayItemType { authentication: string }

export interface RequestType extends PathArrayItemType { request: string }

export interface ResponseType extends PathArrayItemType { response: string }
