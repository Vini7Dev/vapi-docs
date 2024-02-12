import * as ADST from '../../hooks/ApiDocStorage/types'

export type AuthModelItemContainerProps = {
  id: string
  title: string
  type: 'Bearer Token'
  onClickInEdit(
    modelGroup: keyof ADST.ModelsType,
    payload: AuthModelType | PayloadModelType,
  ): void
}

export type PayloadModelItemContainerProps = {
  id: string
  modelGroup: 'requestModels' | 'responseModels'
  title: string
  contentType: 'Application/JSON'
  onClickInEdit(
    modelGroup: keyof ADST.ModelsType,
    payload: AuthModelType | PayloadModelType,
  ): void
}

export type ModalWithFormProps = {
  modelToEdit: ModelToEdit
  onFormSubmit(e: FormEvent<HTMLFormElement>): void
}

export type ModelToEdit = AuthModelType | PayloadModelType
