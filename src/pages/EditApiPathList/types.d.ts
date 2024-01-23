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

export type PathGroupContainerProps = {
  pathGroupName: string
  pathItems: PathItemContrainerProps[]
  togglePathDataModal(): void
}

export type PathItemContrainerProps = {
  method: string
  pathRoute: string
  pathDescription: string
  authenticationsSection: PathItemSpecificationProps[]
  routeParamsSection: PathItemSpecificationProps[]
  queryParamsSection: PathItemSpecificationProps[]
  requestBodiesSection: PathItemPayloadProps[]
  responseBodiesSection: PathItemPayloadProps[]
}

export type PathItemSectionProps = {
  method: string
  title: string
  specifications: PathItemSpecificationProps[]
}

type PathItemSpecificationProps = {
  name: string
  type?: string
  description: string
}

export type PathItemPayloadSectionProps = {
  method: string
  title: string
  payloads: PathItemPayloadProps[]
}

type PathItemPayloadProps = {
  name: string
  type: string
}

export type MultipleFieldsSubtitleProps = {
  subtitle: string
  infoMessage?: string
  onClickInAdd?(): void
}

export type MultipleFieldsProps = {
  fields: FieldProps[]
  fieldGroupValues: FieldGroupValueProps[]
  onClickInRemove?(): void
}

type FieldType = 'select' | 'text'

type FieldProps = {
  type: FieldType
  fieldName: string
  placeholder?: string
  availableOptions?: string[]
  disabled?: boolean
}

type FieldGroupValueProps = {
  [fieldName: string]: string
}
