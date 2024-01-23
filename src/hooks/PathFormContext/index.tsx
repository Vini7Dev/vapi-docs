import React, { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react'

import * as T from './types'

export { T }

interface PathFormContextProps {
  pathFormData: T.PathFromData
  updateFormDataField(fieldName: keyof T.PathFromData, fieldValue: string): void
  updateFormDataFieldArray(
    fieldArrayName: keyof T.PathFromData,
    fieldArrayValue: T.PathArrayItemType[],
  ): void
  addItemOnDataFieldArray(fieldName: keyof T.PathFromData): void
  removeItemFormDataFieldArray(
    fieldName: keyof T.PathFromData,
    indexToRemove: number,
  ): void
  updateItemOnDataFieldArray(
    fieldArrayName: keyof T.PathFromData,
    indexToUpdate: number,
    fieldName: string,
    fieldValue: string,
  ): void
}

const PathFormContext = createContext<PathFormContextProps>({} as PathFormContextProps)

export const PathFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [pathFormData, setPathFormData] = useState<T.PathFromData>({
    pathMethod: 'GET',
    pathRoute: '',
    pathDescription: '',
    pathRouteParams: [],
    pathRouteQuery: [],
    pathAuth: [],
    pathRequest: [],
    pathResponse: [],
  })

  console.log('===> pathFormData', pathFormData)

  const updateFormDataField = useCallback((
    fieldName: keyof T.PathFromData,
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
    fieldArrayName: keyof T.PathFromData,
    fieldArrayValue: T.PathArrayItemType[],
  ) => {
    if (typeof pathFormData[fieldArrayName] !== 'object') return

    const updatedFormData = {
      ...pathFormData,
      [fieldArrayName]: fieldArrayValue
    }

    setPathFormData(updatedFormData)
  }, [pathFormData])

  const addItemOnDataFieldArray = useCallback((
    fieldArrayName: keyof T.PathFromData,
  ) => {
    if (typeof pathFormData[fieldArrayName] !== 'object') return

    const arrayToUpdate = pathFormData[fieldArrayName] as unknown as T.PathArrayItemType[]

    arrayToUpdate.push({})

    setPathFormData({
      ...pathFormData,
      [fieldArrayName]: arrayToUpdate,
    })
  }, [pathFormData])

  const removeItemFormDataFieldArray = useCallback((
    fieldArrayName: keyof T.PathFromData,
    indexToRemove: number,
  ) => {
    if (typeof pathFormData[fieldArrayName] !== 'object') return

    const arrayToUpdate = pathFormData[fieldArrayName] as unknown as T.PathArrayItemType[]

    setPathFormData({
      ...pathFormData,
      [fieldArrayName]: arrayToUpdate.filter((_, idx) => idx !== indexToRemove),
    })
  }, [pathFormData])

  const updateItemOnDataFieldArray = useCallback((
    fieldArrayName: keyof T.PathFromData,
    indexToUpdate: number,
    fieldName: string,
    fieldValue: string,
  ) => {
    if (typeof pathFormData[fieldArrayName] !== 'object') return

    const arrayToUpdate = pathFormData[fieldArrayName] as unknown as T.PathArrayItemType[]

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

export const usePathForm = (): PathFormContextProps => {
  const context = useContext(PathFormContext)

  return context
}
