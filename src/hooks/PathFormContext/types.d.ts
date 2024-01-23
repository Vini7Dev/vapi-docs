export type PathFormContextProps = {
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
