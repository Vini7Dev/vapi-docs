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
  const [models, setModels] = useState<T.ModelsType>({} as T.ModelsType)
  const [apiPathGroups, setApiPathGroups] = useState<T.ApiPathGroup[]>([])

  const saveOrUpdateCoreSettings = useCallback((newCoreSettings: T.CoreSettingsType) => {
    const schema = z.object({
      projectName: z.string().min(1),
      version: z.string().min(1),
      baseURL: z.string().min(1),
      description: z.string().min(1),
    })

    const validationResponse = schema.safeParse(newCoreSettings)

    if (!validationResponse.success) {
      console.log('===> validationResponse.success', validationResponse.success)

      addToast({
        message: 'Please fill in all fields on the form',
        type: 'error',
      })

      return
    }

    console.log('===> newCoreSettings', newCoreSettings)

    setCoreSettings(newCoreSettings)
  }, [])

  const saveOrUpdateModel = useCallback((
    modelGroup: keyof T.ModelsType,
    payload: T.AuthModelType | T.PayloadModelType,
    indexToUpdate?: number,
  ) => {
    const modelUpdatedItem = models[modelGroup]

    if (indexToUpdate) modelUpdatedItem[indexToUpdate] = payload
    else modelUpdatedItem.push(payload)

    setModels({
      ...models,
      [modelGroup]: modelUpdatedItem,
    })
  }, [models])

  const removeModelFromList = useCallback((
    modelGroup: keyof T.ModelsType,
    indexToRemove: number,
  ) => {
    const modelToRemoveItem = models[modelGroup]

    setModels({
      ...models,
      [modelGroup]: modelToRemoveItem.slice(indexToRemove, indexToRemove + 1),
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
  }, [apiPathGroups])

  const removePathGroupFromList = useCallback((indexToRemove: number) => {
    setApiPathGroups(apiPathGroups.slice(indexToRemove, indexToRemove + 1))
  }, [apiPathGroups])

  const saveOrUpdatePath = useCallback((
    groupIndex: number,
    payload: T.PathFromData,
    indexToUpdate?: number,
  ) => {
    const groupToUpdate = apiPathGroups[groupIndex]

    if (indexToUpdate) groupToUpdate.apiPaths[indexToUpdate] = payload
    else groupToUpdate.apiPaths.push(payload)

    setApiPathGroups([
      ...apiPathGroups,
    ])
  }, [apiPathGroups])

  const removePathFromList = useCallback((
    groupIndex: number,
    indexToRemove: number,
  ) => {
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
      saveOrUpdateModel,
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
