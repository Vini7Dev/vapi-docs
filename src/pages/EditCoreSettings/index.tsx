import React, { FormEvent, useState } from 'react'

import { useApiDocStorage } from '../../hooks/ApiDocStorage'
import { PageTitle } from '../../components/PageTitle'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Check } from '../../components/Icons'
import { TextArea } from '../../components/TextArea'
import './styles.css'

export const EditCoreSettings: React.FC = () => {
  const { saveOrUpdateCoreSettings } = useApiDocStorage()

  const [projectName, setProjectName] = useState('')
  const [version, setVersion] = useState('')
  const [baseURL, setBaseURL] = useState('')
  const [description, setDescription] = useState('')

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    saveOrUpdateCoreSettings({
      projectName,
      version,
      baseURL,
      description
    })
  }

  return (
    <div className="edit_core_settings_container">
      <div className="page_content_max_width">
        <PageTitle title="Core Settings" />

        <form onSubmit={onFormSubmit}>
          <div className="double_inputs_container">
            <Input
              className="big_input"
              name="project_name"
              label="Project Name*"
              placeholder="My project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <Input
              className="small_input"
              name="version"
              label="Version*"
              placeholder="1.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>

          <Input
            name="base_url"
            label="Base URL*"
            placeholder="https://my-api.dev/v1"
            value={baseURL}
            onChange={(e) => setBaseURL(e.target.value)}
          />

          <TextArea
            name="description"
            label="Description*"
            placeholder="About the API..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            text="SAVE"
            type="submit"
            Icon={<Check size={24} />}
          />
        </form>
      </div>
    </div>
  )
}
