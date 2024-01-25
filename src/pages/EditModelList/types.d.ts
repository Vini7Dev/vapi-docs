export type AuthModelItemContainerProps = {
  authTitle: string
  authType: 'Bearer Token'
}

export type PayloadModelItemContainerProps = {
  payloadTitle: string
  contentType: 'Application/JSON'
}

export type ModalWithFormProps = {
  onFormSubmit(e: FormEvent<HTMLFormElement>): void
}
