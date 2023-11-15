import React from 'react'

import { PageTitle } from '../../components/PageTitle'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Button } from '../../components/Button'
import { Check } from '../../components/Icons'
import { TextArea } from '../../components/TextArea'
import './styles.css'

export const EditCoreSettings: React.FC = () => {
  return (
    <>
      <PageTitle title="Core Settings" />

      <form>
        <div className="double_inputs_container">
          <Input
            className="big_input"
            name="project_name"
            label="Project Name*"
            placeholder="My project name..."
          />

          <Select
            className="small_input"
            name="version"
            label="Version*"
            placeholder="1.0.0"
            options={['1.0.0', '1.0.1']}
          />
        </div>

        <Input
          name="base_url"
          label="Base URL*"
          placeholder="https://my-api.dev/v1"
        />

        <TextArea
          name="description"
          label="Description*"
          placeholder="About the API..."
        />

        <Button
          text="SAVE"
          type="submit"
          Icon={<Check size={24} />}
        />
      </form>
    </>
  )
}
