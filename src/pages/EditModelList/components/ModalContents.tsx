import React from 'react'

import { Select } from '../../../components/Select'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

export const AuthModalContents: React.FC = () => {
  return (
    <>
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

      <Button text="SUBMIT" height="medium" isFullWidth />
    </>
  )
}

export const RequestModalContents: React.FC = () => {
  return (
    <>
      <Input
        label="Request Model Name*"
        placeholder="My Request Model #1"
        name="modelName"
      />

      <Select
        label="Content Type*"
        name="contentType"
        placeholder="Select the auth type"
        options={['Bearer Token']}
        backgroundColor="#222020"
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </>
  )
}

export const ResponseModalContents: React.FC = () => {
  return (
    <>
      <Input
        label="Response Model Name*"
        placeholder="404 My Response Model #1"
        name="modelName"
      />

      <Select
        label="Content Type*"
        name="contentType"
        placeholder="Select the auth type"
        options={['Bearer Token']}
        backgroundColor="#222020"
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </>
  )
}
