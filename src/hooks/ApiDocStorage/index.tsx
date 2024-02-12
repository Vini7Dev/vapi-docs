import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
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
  ) => {
    const schema = z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1),
      type: z.enum(['Bearer Token']),
    })

    const payloadParsed = { ...payload, id: payload.id || undefined }

    const validationResponse = schema.safeParse(payloadParsed)

    if (!validationResponse.success) {
      addToast({ message: 'Please fill in all fields on the form', type: 'error' })
      return { success: false }
    }

    const modelUpdatedItem = models[modelGroup]

    if (!payload.id) {
      modelUpdatedItem.push({
        ...payload,
        id: uuidv4(),
      })
    } else {
      const modelIndexToUpdate = modelUpdatedItem.findIndex(model => model.id === payload.id)

      if (modelIndexToUpdate === -1) return { success: false }

      modelUpdatedItem[modelIndexToUpdate] = payload
    }

    setModels({
      ...models,
      [modelGroup]: modelUpdatedItem,
    })

    return { success: true }
  }, [models])

  const saveOrUpdatePayloadModel = useCallback((
    modelGroup: 'requestModels' | 'responseModels',
    payload: T.PayloadModelType,
  ) => {
    const modelUpdatedItem = models[modelGroup]

    const schema = z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1),
      contentType: z.enum(['Application/JSON'])
    })

    const payloadParsed = { ...payload, id: payload.id || undefined }

    const validationResponse = schema.safeParse(payloadParsed)

    if (!validationResponse.success) {
      addToast({ message: 'Please fill in all fields on the form', type: 'error' })
      return { success: false }
    }

    if (!payload.id) {
      modelUpdatedItem.push({
        ...payload,
        id: uuidv4(),
      })
    } else {
      const modelIndexToUpdate = modelUpdatedItem.findIndex(model => model.id === payload.id)

      if (modelIndexToUpdate === -1) return { success: false }

      modelUpdatedItem[modelIndexToUpdate] = payload
    }

    setModels({
      ...models,
      [modelGroup]: modelUpdatedItem,
    })

    return { success: true }
  }, [models])

  const removeModelFromList = useCallback((
    modelGroup: keyof T.ModelsType,
    modelId: string,
  ) => {
    if (!removeConfirmation()) return

    const modelToRemoveItem = models[modelGroup]

    const modelIndexToRemove = modelToRemoveItem.findIndex(model => model.id === modelId)

    if (modelIndexToRemove === -1) return

    modelToRemoveItem.splice(modelIndexToRemove, 1)

    setModels({
      ...models,
      [modelGroup]: modelToRemoveItem,
    })
  }, [models])

  const saveOrUpdatePathGroup = useCallback((
    payload: Omit<T.ApiPathGroup, 'apiPaths'>,
    indexToUptade?: number,
  ) => {
    const updatedPathGroups = apiPathGroups

    if (indexToUptade) updatedPathGroups[indexToUptade].groupName = payload.groupName
    else updatedPathGroups.push({ groupName: payload.groupName, apiPaths: [] })

    setApiPathGroups([...updatedPathGroups])

    return { success: true }
  }, [apiPathGroups])

  const removePathGroupFromList = useCallback((indexToRemove: number) => {
    if (!removeConfirmation()) return

    apiPathGroups.splice(indexToRemove, 1)

    setApiPathGroups([...apiPathGroups])
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
