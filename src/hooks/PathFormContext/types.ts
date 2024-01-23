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

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

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
