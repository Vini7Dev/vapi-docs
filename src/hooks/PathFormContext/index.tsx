import React, { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react'

import * as ADST from '../ApiDocStorage/types'
import * as T from './types'

const EMPTY_FORM_VALUES: ADST.ApiPathData = {
  id: '',
  pathMethod: 'GET',
  pathRoute: '',
  pathDescription: '',
  pathRouteParams: [],
  pathRouteQuery: [],
  pathAuth: [],
  pathRequest: [],
  pathResponse: [],
}

const PathFormContext = createContext<T.PathFormContextProps>({} as T.PathFormContextProps)

export const PathFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [pathFormData, setPathFormData] = useState<ADST.ApiPathData>(EMPTY_FORM_VALUES)

  const updateFormDataField = useCallback((
    fieldName: keyof ADST.ApiPathData,
    fieldValue: string,
  ) => {
    if (typeof pathFormData[fieldName] !== 'string') return

    const updatedFormData = {
      ...pathFormData,
      [fieldName]: fieldValue
    }

    setPathFormData(updatedFormData)
  }, [pathFormData])

  const updateFormDataFieldArray = useCallback((
    fieldArrayName: keyof ADST.ApiPathData,
    fieldArrayValue: ADST.PathArrayItemType[],
  ) => {
    if (typeof pathFormData[fieldArrayName] !== 'object') return

    const updatedFormData = {
      ...pathFormData,
      [fieldArrayName]: fieldArrayValue
    }

    setPathFormData(updatedFormData)
  }, [pathFormData])

  const addItemOnDataFieldArray = useCallback((
    fieldArrayName: keyof ADST.ApiPathData,
  ) => {
    if (typeof pathFormData[fieldArrayName] !== 'object') return

    const arrayToUpdate = pathFormData[fieldArrayName] as unknown as ADST.PathArrayItemType[]

    arrayToUpdate.push({})

    setPathFormData({
      ...pathFormData,
      [fieldArrayName]: arrayToUpdate,
    })
  }, [pathFormData])

  const removeItemFormDataFieldArray = useCallback((
    fieldArrayName: keyof ADST.ApiPathData,
    indexToRemove: number,
  ) => {
    if (typeof pathFormData[fieldArrayName] !== 'object') return

    const arrayToUpdate = pathFormData[fieldArrayName] as unknown as ADST.PathArrayItemType[]

    setPathFormData({
      ...pathFormData,
      [fieldArrayName]: arrayToUpdate.filter((_, idx) => idx !== indexToRemove),
    })
  }, [pathFormData])

  const updateItemOnDataFieldArray = useCallback((
    fieldArrayName: keyof ADST.ApiPathData,
    indexToUpdate: number,
    fieldName: string,
    fieldValue: string,
  ) => {
    if (typeof pathFormData[fieldArrayName] !== 'object') return

    const arrayToUpdate = pathFormData[fieldArrayName] as unknown as ADST.PathArrayItemType[]

    arrayToUpdate[indexToUpdate][fieldName] = fieldValue

    setPathFormData({
      ...pathFormData,
      [fieldArrayName]: arrayToUpdate,
    })
  }, [pathFormData])

  return (
    <PathFormContext.Provider value={{
      pathFormData,
      updateFormDataField,
      updateFormDataFieldArray,
      addItemOnDataFieldArray,
      removeItemFormDataFieldArray,
      updateItemOnDataFieldArray,
    }}>
      {children}
    </PathFormContext.Provider>
  )
}

export const usePathForm = (): T.PathFormContextProps => {
  const context = useContext(PathFormContext)

  return context
}
