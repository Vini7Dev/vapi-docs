import React from 'react'

import { Select } from '../../../components/Select'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import * as T from '../types'

export const AuthModalContents: React.FC<T.ModalWithFormProps> = ({
  modelToEdit,
  onFormSubmit,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <Input name="id" value={modelToEdit?.id} style={{ display: 'none' }} />

      <Input
        label="Auth Model Name*"
        placeholder="Admin Auth"
        name="modelName"
        defaultValue={modelToEdit?.title}
        autoFocus
      />

      <Input
        label="Auth Model Description"
        placeholder="Admin auth token"
        name="modelDescription"
        defaultValue={modelToEdit?.description}
        autoFocus
      />

      <Select
        label="Auth Type*"
        name="modelType"
        placeholder="Select the auth type"
        options={['Bearer Token']}
        backgroundColor="#222020"
        defaultValue={modelToEdit?.type}
      />

      <Button text="SUBMIT" type="submit" height="medium" isFullWidth />
    </form>
  )
}

export const RequestModalContents: React.FC<T.ModalWithFormProps> = ({
  modelToEdit,
  onFormSubmit,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <Input name="id" value={modelToEdit?.id} style={{ display: 'none' }} />

      <Input
        label="Request Model Name*"
        placeholder="My Request Model #1"
        name="modelName"
        defaultValue={modelToEdit?.title}
        autoFocus
      />

      <Select
        label="Content Type*"
        name="modelType"
        placeholder="Select the auth type"
        options={['Application/JSON']}
        backgroundColor="#222020"
        defaultValue={modelToEdit?.contentType}
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </form>
  )
}

export const ResponseModalContents: React.FC<T.ModalWithFormProps> = ({
  modelToEdit,
  onFormSubmit,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <Input name="id" defaultValue={modelToEdit?.id} style={{ display: 'none' }} />

      <Input
        label="Response Model Name*"
        placeholder="404 My Response Model #1"
        name="modelName"
        defaultValue={modelToEdit?.title}
        autoFocus
      />

      <Select
        label="Content Type*"
        name="modelType"
        placeholder="Select the auth type"
        options={['Application/JSON']}
        backgroundColor="#222020"
        defaultValue={modelToEdit?.contentType}
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </form>
  )
}
