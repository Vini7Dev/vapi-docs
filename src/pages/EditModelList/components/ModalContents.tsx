import React from 'react'

import { Select } from '../../../components/Select'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import * as T from '../types'

export const AuthModalContents: React.FC<T.ModalWithFormProps> = ({ onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <Input
        label="Auth Model Name*"
        placeholder="Admin Auth"
        name="modelName"
      />

      <Select
        label="Auth Type*"
        name="modelType"
        placeholder="Select the auth type"
        options={['Bearer Token']}
        backgroundColor="#222020"
      />

      <Button text="SUBMIT" type="submit" height="medium" isFullWidth />
    </form>
  )
}

export const RequestModalContents: React.FC<T.ModalWithFormProps> = ({ onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <Input
        label="Request Model Name*"
        placeholder="My Request Model #1"
        name="modelName"
      />

      <Select
        label="Content Type*"
        name="modelType"
        placeholder="Select the auth type"
        options={['Application/JSON']}
        backgroundColor="#222020"
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </form>
  )
}

export const ResponseModalContents: React.FC<T.ModalWithFormProps> = ({ onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <Input
        label="Response Model Name*"
        placeholder="404 My Response Model #1"
        name="modelName"
      />

      <Select
        label="Content Type*"
        name="modelType"
        placeholder="Select the auth type"
        options={['Application/JSON']}
        backgroundColor="#222020"
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </form>
  )
}
