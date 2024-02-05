import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { z } from 'zod'

import { useToast } from '../Toast'
import * as T from './types'

const ApiDocStorageContext = createContext<T.ApiDocStorageContextProps>({} as T.ApiDocStorageContextProps)

export const ApiDocStorageProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { addToast } = useToast()

  const [coreSettings, setCoreSettings] = useState<T.CoreSettingsType>({} as T.CoreSettingsType)
  const [apiPathGroups, setApiPathGroups] = useState<T.ApiPathGroup[]>([])
  const [models, setModels] = useState<T.ModelsType>({
    authModels: [],
    requestModels: [],
    responseModels: [],
  } as T.ModelsType)

  const removeConfirmation = useCallback(() => {
    const confirmation = confirm('Do you really want to remove it? This action cannot be undone.')

    return confirmation
  }, [])

  const saveOrUpdateCoreSettings = useCallback((newCoreSettings: T.CoreSettingsType) => {
    const schema = z.object({
      projectName: z.string().min(1),
      version: z.string().min(1),
      baseURL: z.string().min(1),
      description: z.string().min(1),
    })

    const validationResponse = schema.safeParse(newCoreSettings)

    if (!validationResponse.success) {
      addToast({ message: 'Please fill in all fields on the form', type: 'error'})
      return { success: false }
    }

    setCoreSettings(newCoreSettings)

    return { success: true }
  }, [])

  const saveOrUpdateAuthModel = useCallback((
    modelGroup: 'authModels',
    payload: T.AuthModelType,
    indexToUpdate?: number,
  ) => {
    const schema = z.object({
      authTitle: z.string().min(1),
      authType: z.enum(['Bearer Token']),
    })

    const validationResponse = schema.safeParse(payload)

    if (!validationResponse.success) {
      addToast({ message: 'Please fill in all fields on the form', type: 'error' })
      return { success: false }
    }

    const modelUpdatedItem = models[modelGroup]

    if (indexToUpdate !== undefined) modelUpdatedItem[indexToUpdate] = payload
    else modelUpdatedItem.push(payload)

    setModels({
      ...models,
      [modelGroup]: modelUpdatedItem,
    })

    return { success: true }
  }, [models])

  const saveOrUpdatePayloadModel = useCallback((
    modelGroup: 'requestModels' | 'responseModels',
    payload: T.PayloadModelType,
    indexToUpdate?: number,
  ) => {
    const modelUpdatedItem = models[modelGroup]

    const schema = z.object({
      payloadTitle: z.string().min(1),
      contentType: z.enum(['Application/JSON'])
    })

    const validationResponse = schema.safeParse(payload)

    if (!validationResponse.success) {
      addToast({ message: 'Please fill in all fields on the form', type: 'error' })
      return { success: false }
    }

    if (indexToUpdate !== undefined) modelUpdatedItem[indexToUpdate] = payload
    else modelUpdatedItem.push(payload)

    setModels({
      ...models,
      [modelGroup]: modelUpdatedItem,
    })

    return { success: true }
  }, [models])

  const removeModelFromList = useCallback((
    modelGroup: keyof T.ModelsType,
    indexToRemove: number,
  ) => {
    if (!removeConfirmation()) return

    const modelToRemoveItem = models[modelGroup]

    modelToRemoveItem.splice(indexToRemove, 1)

    setModels({
      ...models,
      [modelGroup]: modelToRemoveItem,
    })
  }, [models])

  const saveOrUpdatePathGroup = useCallback((
    payload: T.ApiPathGroup,
    indexToUptade?: number,
  ) => {
    const updatedPathGroups = apiPathGroups

    if (indexToUptade) updatedPathGroups[indexToUptade] = payload
    else updatedPathGroups.push(payload)

    setApiPathGroups([...updatedPathGroups])

    return { success: true }
  }, [apiPathGroups])

  const removePathGroupFromList = useCallback((indexToRemove: number) => {
    if (!removeConfirmation()) return

    setApiPathGroups(apiPathGroups.slice(indexToRemove, indexToRemove + 1))
  }, [apiPathGroups])

  const saveOrUpdatePath = useCallback((
    groupIndex: number,
    payload: T.PathFromData,
    indexToUpdate?: number,
  ) => {
    const groupToUpdate = apiPathGroups[groupIndex]

    if (indexToUpdate !== undefined) groupToUpdate.apiPaths[indexToUpdate] = payload
    else groupToUpdate.apiPaths.push(payload)

    setApiPathGroups([
      ...apiPathGroups,
    ])

    return { success: true }
  }, [apiPathGroups])

  const removePathFromList = useCallback((
    groupIndex: number,
    indexToRemove: number,
  ) => {
    if (!removeConfirmation()) return

    const groupToUpdate = apiPathGroups[groupIndex]

    groupToUpdate.apiPaths.splice(indexToRemove, 1)

    setApiPathGroups([...apiPathGroups, groupToUpdate])
  }, [apiPathGroups])

  return (
    <ApiDocStorageContext.Provider value={{
      coreSettings,
      models,
      apiPathGroups,
      removeModelFromList,
      removePathFromList,
      removePathGroupFromList,
      saveOrUpdateCoreSettings,
      saveOrUpdateAuthModel,
      saveOrUpdatePayloadModel,
      saveOrUpdatePath,
      saveOrUpdatePathGroup,
    }}>
      {children}
    </ApiDocStorageContext.Provider>
  )
}

export const useApiDocStorage = () => {
  const context = useContext(ApiDocStorageContext)

  return context
}
