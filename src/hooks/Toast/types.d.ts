export type ToastContextProps = {
  addToast(message: Omit<T.MessageProps, 'id'>): void
  removeToast(id: number): void
}

export type MessageProps = {
  id: number
  message: string
  type: 'error'
}
