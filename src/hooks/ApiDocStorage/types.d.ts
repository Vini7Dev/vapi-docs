type ApiDocStorageContextProps = {
  coreSettings: T.CoreSettingsType
  models: T.ModelsType
  apiPathGroups: T.ApiPathGroup[]
  saveOrUpdateCoreSettings(newCoreSettings: T.CoreSettingsType): void
  saveOrUpdateModel(
    modelGroup: keyof T.ModelsType,
    payload: T.AuthModelType | T.PayloadModelType,
    indexToUpdate?: number,
  ): void
  removeModelFromList(modelGroup: keyof T.ModelsType, indexToRemove: number): void
  saveOrUpdatePathGroup(payload: T.ApiPathGroup, indexToUptade?: number): void
  removePathGroupFromList(indexToRemove: number): void
  saveOrUpdatePath(
    groupIndex: number,
    payload: T.PathFromData,
    indexToUpdate?: number
  ): void
  removePathFromList(groupIndex: number, indexToRemove: number): void
}

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

export type AuthModelType = {
  authTitle?: string
  authType?: 'Bearer Token'
}

export type PayloadModelType = {
  payloadTitle?: string
  contentType?: 'Application/JSON'
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
