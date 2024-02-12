import { useApiDocStorage } from '../hooks/ApiDocStorage'
import * as ADST from '../hooks/ApiDocStorage/types'

export const getModelById = (modelGroupKey: keyof ADST.ModelsType, id: string) => {
  const { models } = useApiDocStorage()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelGroup = models[modelGroupKey] as any[]

  return modelGroup.find(model => model.id === id)
}
