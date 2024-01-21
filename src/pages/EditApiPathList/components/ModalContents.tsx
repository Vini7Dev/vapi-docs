import React from 'react'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

export const PathGroupModalContents: React.FC = () => {
  return (
    <>
      <Input
        label="Path Group Name*"
        placeholder="Users"
        name="pathGroupName"
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </>
  )
}
