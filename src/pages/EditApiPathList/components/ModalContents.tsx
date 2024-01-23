import React, { useCallback, useEffect, useState } from 'react'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select'
import { Trash, Plus, Info } from '../../../components/Icons'
import { extractTextsBetweenBraces } from '../../../utils/extractTextsBetweenBraces'
import * as T from '../types'

const AUTHENTICATIONS_MOCK = ['Admin Auth', 'Customer Auth']
const REQUESTS_MOCK = ['#1 My Request Model', '#2 My Request Model']
const RESPONSES_MOCK = ['#1 My Response Model', '#2 My Response Model']

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
  onClickInRemove,
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
                />
              ) : (
                <Input
                  placeholder="Prop description"
                  name={field.fieldName}
                  value={fieldGroupValues[field.fieldName]}
                  disabled={field.disabled}
                />
              )}
            </>
          ))}

          {onClickInRemove ? (
            <button className="path_remove_select_button" onClick={onClickInRemove}>
              <Trash size={24} />
            </button>
          ) : <div className="path_remove_select_button" />}
        </div>
      ))}
    </div>
  )
}

export const PathDataModalContents: React.FC = () => {
  const [pathRoute, setPathRoute] = useState('')
  const [pathRouteParams, setPathRouteParams] = useState<T.RouteParamType[]>([])
  const [pathRouteQuery, setPathRouteQuery] = useState<T.QueryParamType[]>([])
  const [pathAuth, setPathAuth] = useState<T.AuthenticationType[]>([])
  const [pathRequest, setPathRequest] = useState<T.RequestType[]>([])
  const [pathResponse, setPathResponse] = useState<T.ResponseType[]>([])

  useEffect(() => {
    const paramsInRoute = extractTextsBetweenBraces(pathRoute)

    const routeParamsFormated = paramsInRoute.map(param => ({
      routeParam: param, routeParamDescription: ''
    }))

    setPathRouteParams(routeParamsFormated)
  }, [pathRoute])

  const addEmptyItemOnArray = useCallback(<ItemType extends T.PathArrayItemType>(
    originalArray: ItemType[],
    setNewArray: (newArray:ItemType[]) => void
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setNewArray([...originalArray, {} as any])
  }, [])

  return (
    <>
      <Select
        label="Method*"
        placeholder="GET"
        name="pathMethod"
        backgroundColor="#222020"
        options={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}
      />

      <Input
        label="Route*"
        placeholder="/users"
        name="pathRoute"
        value={pathRoute}
        onChange={(e) => setPathRoute(e.target.value)}
      />

      <Input
        label="Description*"
        placeholder="List all users"
        name="pathDescription"
      />

      <MultipleFieldsSubtitle
        subtitle="Route Params"
        infoMessage={'In the "Route" field, add a parameter like "{id}" to appear here'}
      />

      <MultipleFields
        fieldGroupValues={pathRouteParams}
        fields={[
          { type: 'text', fieldName: 'routeParam', disabled: true },
          { type: 'text', fieldName: 'routeParamDescription', placeholder: 'Param description' },
        ]}
      />

      <MultipleFieldsSubtitle
        subtitle="Query Params"
        onClickInAdd={() => {
          addEmptyItemOnArray<T.QueryParamType>(pathRouteQuery, setPathRouteQuery)
        }}
      />

      <MultipleFields
        onClickInRemove={() => {}}
        fieldGroupValues={pathRouteQuery}
        fields={[
          { type: 'text', fieldName: 'routeQuery' },
          { type: 'text', fieldName: 'routeQueryDescription', placeholder: 'Query param description' },
        ]}
      />

      <MultipleFieldsSubtitle
        subtitle="Authentications"
        onClickInAdd={() => {
          addEmptyItemOnArray<T.AuthenticationType>(pathAuth, setPathAuth)
        }}
      />

      <MultipleFields
        onClickInRemove={() => {}}
        fields={[{ type: 'select', fieldName: 'authentication', availableOptions: AUTHENTICATIONS_MOCK }]}
        fieldGroupValues={pathAuth}
      />

      <MultipleFieldsSubtitle
        subtitle="Request Bodies"
        onClickInAdd={() => {
          addEmptyItemOnArray<T.RequestType>(pathRequest, setPathRequest)
        }}
      />

      <MultipleFields
        onClickInRemove={() => {}}
        fields={[{ type: 'select', fieldName: 'request', availableOptions: REQUESTS_MOCK }]}
        fieldGroupValues={pathRequest}
      />

      <MultipleFieldsSubtitle
        subtitle="Responses"
        onClickInAdd={() => {
          addEmptyItemOnArray<T.ResponseType>(pathResponse, setPathResponse)
        }}
      />

      <MultipleFields
        onClickInRemove={() => {}}
        fields={[{ type: 'select', fieldName: 'response', availableOptions: RESPONSES_MOCK }]}
        fieldGroupValues={pathResponse}
      />

      <Button text="SUBMIT" height="medium" isFullWidth />
    </>
  )
}
