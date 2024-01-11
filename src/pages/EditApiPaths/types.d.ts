export type PathItemContrainerProps = {
  method: string
  pathRoute: string
  pathDescription: string
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
