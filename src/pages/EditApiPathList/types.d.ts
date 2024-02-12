import * as ADST from '../../hooks/ApiDocStorage/types'
import * as FDT from '../../hooks/PathFormContext/types'

export type PathGroupContainerProps = {
  index: number
  pathGroupName: string
  apiPaths: ADST.PathFromData[]
  onAddOrEditPathGroup(index: number): void
  onAddOrEditPath(): void
}

export type PathItemContrainerProps = {
  pathData: ADST.PathFromData
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
  fieldArrayName: keyof FDT.PathFromData
  onClickInRemove?(
    fieldArrayName: keyof FDT.PathFromData,
    indexToRemove: number,
  ): void
  onUpdateField(
    fieldArrayName: keyof FDT.PathFromData,
    indexToUpdate: number,
    fieldName: string,
    fieldValue: string
  ): void
}

type FieldType = 'select' | 'text'

type FieldProps = {
  type: FieldType
  fieldName: string
  placeholder?: string
  defaultValue?: string
  availableOptions?: string[]
  disabled?: boolean
}

type FieldGroupValueProps = {
  [fieldName: string]: string
}

type ModalContentsProps = {
  title: string
  component: React.FC<PathGroupModalContentsProps>
}

type ModalContentComponentProps = {
  index?: number
  closeModal(): void
}

type PathGroupModalContentsProps = ModalContentComponentProps

type PathDataModalContents = ModalContentComponentProps
