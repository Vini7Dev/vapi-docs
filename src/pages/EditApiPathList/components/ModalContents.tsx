import React, { FormEvent, useCallback, useEffect, useState } from 'react'

import { HTTP_METHODS } from '../../../utils/constants'
import { extractTextsBetweenBraces } from '../../../utils/extractTextsBetweenBraces'
import { useApiDocStorage } from '../../../hooks/ApiDocStorage'
import { usePathForm } from '../../../hooks/PathFormContext'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select'
import { Trash, Plus, Info } from '../../../components/Icons'
import * as T from '../types'

export const PathGroupModalContents: React.FC<T.PathGroupModalContentsProps> = ({
  id,
  closeModal,
}) => {
  const { apiPathGroups, saveOrUpdatePathGroup } = useApiDocStorage()

  const groupToEdit = apiPathGroups.find(group => group.id === id)

  const [groupName, setGroupName] = useState(groupToEdit?.groupName ?? '')

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { success } = saveOrUpdatePathGroup({ id: groupToEdit?.id, groupName })

    if (success) closeModal()
  }, [groupToEdit, groupName, closeModal])

  return (
    <form onSubmit={onSubmitForm}>
      <Input
        label="Path Group Name*"
        placeholder="Users"
        name="pathGroupName"
        value={groupName}
        autoFocus
        onChange={(e) => setGroupName(e.target.value)}
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </form>
  )
}

const MultipleFieldsSubtitle: React.FC<T.MultipleFieldsSubtitleProps> = ({
  subtitle,
  infoMessage,
  onClickInAdd,
}) => {
  return (
    <>
      <div className="modal_subtitle path_subtitle_container">
        <h4>{subtitle}</h4>
        {onClickInAdd && (
          <button className="path_add_select_button" onClick={onClickInAdd}>
            <Plus size={18} /> Add
          </button>
        )}

        {infoMessage && (
          <button className="path_info_message_button">
            <Info size={18} />
            <span>{infoMessage}</span>
          </button>
        )}
      </div>
    </>
  )
}

const MultipleFields: React.FC<T.MultipleFieldsProps> = ({
  fields,
  fieldGroupValues,
  fieldArrayName,
  onClickInRemove,
  onUpdateField,
}) => {
  return (
    <div className="path_multiple_fields_container">
      {fieldGroupValues.map((fieldGroupValues, idx) => (
        <div key={idx} className="path_select_item">
          {fields.map((field) => (
            <>
              {field.type == 'select' ? (
                <Select
                  placeholder="Example"
                  name={field.fieldName}
                  backgroundColor="#222020"
                  options={field?.availableOptions ?? []}
                  value={fieldGroupValues[field.fieldName]}
                  disabled={field.disabled}
                  onChange={(e) => {
                    onUpdateField(fieldArrayName, idx, field.fieldName, e.target.value)
                  }}
                  onLoad={() => {
                    if (!field.defaultValue) return
                    onUpdateField(fieldArrayName, idx, field.fieldName, field.defaultValue)
                  }}
                />
              ) : (
                <Input
                  placeholder="Prop description"
                  name={field.fieldName}
                  value={fieldGroupValues[field.fieldName]}
                  disabled={field.disabled}
                  onChange={(e) => {
                    onUpdateField(fieldArrayName, idx, field.fieldName, e.target.value)
                  }}
                  onLoad={() => {
                    if (!field.defaultValue) return
                    onUpdateField(fieldArrayName, idx, field.fieldName, field.defaultValue)
                  }}
                />
              )}
            </>
          ))}

          {onClickInRemove ? (
            <button
              className="path_remove_select_button"
              onClick={() => onClickInRemove(fieldArrayName, idx)}
            >
              <Trash size={24} />
            </button>
          ) : <div className="path_remove_select_button" />}
        </div>
      ))}
    </div>
  )
}

export const PathDataModalContents: React.FC<T.PathDataModalContents> = ({
  id,
  closeModal,
}) => {
  const { models, saveOrUpdatePath } = useApiDocStorage()

  const {
    pathFormData,
    updateFormDataField,
    updateFormDataFieldArray,
    addItemOnDataFieldArray,
    removeItemFormDataFieldArray,
    updateItemOnDataFieldArray,
  } = usePathForm()

  if (!pathFormData) return <></>

  const {
    pathMethod,
    pathRoute,
    pathDescription,
    pathRouteParams,
    pathRouteQuery,
    pathAuth,
    pathRequest,
    pathResponse,
  } = pathFormData

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { success } = saveOrUpdatePath()

    if (success) closeModal()
  }, [])

  useEffect(() => {
    const paramsInRoute = extractTextsBetweenBraces(pathRoute)

    const formatedRouteParams = paramsInRoute.map(param => ({ routeParam: param }))

    updateFormDataFieldArray('pathRouteParams', formatedRouteParams)
  }, [pathRoute])

  return (
    <form onSubmit={onSubmitForm}>
      <Select
        label="Method*"
        placeholder={HTTP_METHODS[0]}
        name="pathMethod"
        backgroundColor="#222020"
        options={HTTP_METHODS}
        value={pathMethod}
        autoFocus
        onChange={(e) => updateFormDataField('pathMethod', e.target.value)}
      />

      <Input
        label="Route*"
        placeholder="/users"
        name="pathRoute"
        value={pathRoute}
        onChange={(e) => updateFormDataField('pathRoute', e.target.value)}
      />

      <Input
        label="Description*"
        placeholder="List all users"
        name="pathDescription"
        value={pathDescription}
        onChange={(e) => updateFormDataField('pathDescription', e.target.value)}
      />

      <MultipleFieldsSubtitle
        subtitle="Route Params"
        infoMessage={'In the "Route" field, add a parameter like "{id}" to appear here'}
      />

      <MultipleFields
        onUpdateField={updateItemOnDataFieldArray}
        fieldArrayName="pathRouteParams"
        fieldGroupValues={pathRouteParams}
        fields={[
          { type: 'text', fieldName: 'param', disabled: true },
          { type: 'text', fieldName: 'type', placeholder: 'string' },
          { type: 'text', fieldName: 'description', placeholder: 'Param description' },
        ]}
      />

      <MultipleFieldsSubtitle
        subtitle="Query Params"
        onClickInAdd={() => addItemOnDataFieldArray('pathRouteQuery')}
      />

      <MultipleFields
        onClickInRemove={removeItemFormDataFieldArray}
        onUpdateField={updateItemOnDataFieldArray}
        fieldArrayName="pathRouteQuery"
        fieldGroupValues={pathRouteQuery}
        fields={[
          { type: 'text', fieldName: 'param' },
          { type: 'text', fieldName: 'type', placeholder: 'string' },
          { type: 'text', fieldName: 'description', placeholder: 'Query param description' },
        ]}
      />

      <MultipleFieldsSubtitle
        subtitle="Authentications"
        onClickInAdd={() => addItemOnDataFieldArray('pathAuth')}
      />

      <MultipleFields
        onClickInRemove={removeItemFormDataFieldArray}
        onUpdateField={updateItemOnDataFieldArray}
        fieldArrayName="pathAuth"
        fields={[{
          type: 'select',
          fieldName: 'authentication',
          availableOptions: models.authModels.map(option => option.title),
          defaultValue: models.authModels[0].id
        }]}
        fieldGroupValues={pathAuth}
      />

      <MultipleFieldsSubtitle
        subtitle="Request Bodies"
        onClickInAdd={() => addItemOnDataFieldArray('pathRequest')}
      />

      <MultipleFields
        onClickInRemove={removeItemFormDataFieldArray}
        onUpdateField={updateItemOnDataFieldArray}
        fieldArrayName="pathRequest"
        fields={[{
          type: 'select',
          fieldName: 'request',
          availableOptions: models.requestModels.map(option => option.title),
          defaultValue: models.requestModels[0].id
        }]}
        fieldGroupValues={pathRequest}
      />

      <MultipleFieldsSubtitle
        subtitle="Responses"
        onClickInAdd={() => addItemOnDataFieldArray('pathResponse')}
      />

      <MultipleFields
        onClickInRemove={removeItemFormDataFieldArray}
        onUpdateField={updateItemOnDataFieldArray}
        fieldArrayName="pathResponse"
        fields={[{
          type: 'select',
          fieldName: 'response',
          availableOptions: models.responseModels.map(option => option.title),
          defaultValue: models.responseModels[0].id
        }]}
        fieldGroupValues={pathResponse}
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </form>
  )
}
