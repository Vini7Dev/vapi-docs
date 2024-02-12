export type PathFormContextProps = {
  pathFormData: T.ApiPathData
  updateFormDataField(fieldName: keyof T.ApiPathData, fieldValue: string): void
  updateFormDataFieldArray(
    fieldArrayName: keyof T.ApiPathData,
    fieldArrayValue: T.PathArrayItemType[],
  ): void
  addItemOnDataFieldArray(fieldName: keyof T.ApiPathData): void
  removeItemFormDataFieldArray(
    fieldName: keyof T.ApiPathData,
    indexToRemove: number,
  ): void
  updateItemOnDataFieldArray(
    fieldArrayName: keyof T.ApiPathData,
    indexToUpdate: number,
    fieldName: string,
    fieldValue: string,
  ): void
}
