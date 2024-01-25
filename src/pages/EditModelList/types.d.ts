import * as ADST from '../../hooks/ApiDocStorage/types'

export type AuthModelItemContainerProps = {
  index: number
  authTitle: string
  authType: 'Bearer Token'
  onClickInEdit(
    index: number,
    modelGroup: keyof ADST.ModelsType,
    payload: AuthModelType | PayloadModelType,
  ): void
}

export type PayloadModelItemContainerProps = {
  index: number
  modelGroup: 'requestModels' | 'responseModels'
  payloadTitle: string
  contentType: 'Application/JSON'
  onClickInEdit(
    index: number,
    modelGroup: keyof ADST.ModelsType,
    payload: AuthModelType | PayloadModelType,
  ): void
}

export type ModalWithFormProps = {
  modelToEdit: ModelToEdit
  onFormSubmit(e: FormEvent<HTMLFormElement>): void
}

export type ModelToEdit = (AuthModelType | PayloadModelType) & { index: number }
